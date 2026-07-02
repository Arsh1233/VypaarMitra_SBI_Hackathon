import logging
import time
from typing import TypedDict, Optional, Dict, Any
from langgraph.graph import StateGraph, START, END

from circuit_breaker import CircuitBreaker, CircuitBreakerOpenException
from state_manager import emit_audit_event, get_memory_saver

logger = logging.getLogger(__name__)

class AgentState(TypedDict):
    user_id: str
    idempotency_key: str
    input_summary: str
    confidence_score: float
    verification_pending: bool
    account_tier: str
    error: Optional[str]

# Mock MCA API call
def call_mca_api():
    """Mock MCA API call. Will be patched by test_hardness.py to hang."""
    time.sleep(0.1) # Normal fast response
    return {"status": "success", "data": "MCA verified"}

def intake(state: AgentState) -> AgentState:
    emit_audit_event(state['user_id'], 'intake', 1.0, state.get('input_summary', ''))
    return state

def consent(state: AgentState) -> AgentState:
    emit_audit_event(state['user_id'], 'consent', 1.0, state.get('input_summary', ''))
    return state

def doc_extract(state: AgentState) -> AgentState:
    emit_audit_event(state['user_id'], 'doc_extract', 0.95, state.get('input_summary', ''))
    return state

def parallel_verify(state: AgentState) -> AgentState:
    try:
        # We wrap the API call in the circuit breaker
        result = CircuitBreaker.execute(call_mca_api)
        emit_audit_event(state['user_id'], 'parallel_verify', 0.9, state.get('input_summary', ''))
        return {"error": None}
    except CircuitBreakerOpenException as e:
        logger.warning(f"parallel_verify failed: {e}")
        emit_audit_event(state['user_id'], 'parallel_verify', 0.0, "Circuit Breaker Opened")
        return {"error": "circuit_open"}

def deferred_verification(state: AgentState) -> AgentState:
    logger.info("Scheduling Celery task for deferred verification...")
    # Mock scheduling Celery task
    emit_audit_event(state['user_id'], 'deferred_verification', 0.5, "Deferred to background")
    return {
        "verification_pending": True,
        "account_tier": "limited",
        "error": None
    }

def risk_ubo(state: AgentState) -> AgentState:
    emit_audit_event(state['user_id'], 'risk_ubo', 0.88, state.get('input_summary', ''))
    return state

def product_elig(state: AgentState) -> AgentState:
    emit_audit_event(state['user_id'], 'product_elig', 0.9, state.get('input_summary', ''))
    return state

def account_create(state: AgentState) -> AgentState:
    tier = state.get('account_tier', 'standard')
    logger.info(f"Creating account with tier: {tier}")
    emit_audit_event(state['user_id'], 'account_create', 1.0, f"Account tier: {tier}")
    return state

def complete(state: AgentState) -> AgentState:
    emit_audit_event(state['user_id'], 'complete', 1.0, "Workflow finished")
    return state

# Routing logic
def route_after_verify(state: AgentState) -> str:
    if state.get("error") == "circuit_open":
        return "deferred_verification"
    return "risk_ubo"

# Build Graph
builder = StateGraph(AgentState)

builder.add_node("intake", intake)
builder.add_node("consent", consent)
builder.add_node("doc_extract", doc_extract)
builder.add_node("parallel_verify", parallel_verify)
builder.add_node("deferred_verification", deferred_verification)
builder.add_node("risk_ubo", risk_ubo)
builder.add_node("product_elig", product_elig)
builder.add_node("account_create", account_create)
builder.add_node("complete", complete)

builder.add_edge(START, "intake")
builder.add_edge("intake", "consent")
builder.add_edge("consent", "doc_extract")
builder.add_edge("doc_extract", "parallel_verify")

builder.add_conditional_edges(
    "parallel_verify",
    route_after_verify,
    {
        "deferred_verification": "deferred_verification",
        "risk_ubo": "risk_ubo"
    }
)

builder.add_edge("deferred_verification", "complete")
builder.add_edge("risk_ubo", "product_elig")
builder.add_edge("product_elig", "account_create")
builder.add_edge("account_create", "complete")
builder.add_edge("complete", END)

# Compile Graph with MemorySaver
memory_saver = get_memory_saver()
vyapaar_graph = builder.compile(checkpointer=memory_saver)
