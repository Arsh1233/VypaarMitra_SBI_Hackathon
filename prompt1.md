### Prompt 1: Backend & Agent Orchestration (LangGraph + Circuit Breaker)

> **Role:** Senior Backend Architect (Node.js / Python).
> **Project:** "Vyapaar Mitra" — Agentic Onboarding State Machine.
> **Goal:** Build a resilient, checkpointed LangGraph workflow that survives API failures and network timeouts.
> 
> **Absolute Requirements (No Compromises):**
> 1. **Directory Structure**: Create `/backend/src/`.
>    - `graph.py` (Contains the 8-node LangGraph: `intake` → `consent` → `doc_extract` → `parallel_verify` → `risk_ubo` → `product_elig` → `account_create` → `complete`).
>    - `circuit_breaker.py` (Implement a Python `CircuitBreaker` class using `tenacity` with retry=3, wait=2s, 4s, 8s).
>    - `state_manager.py` (Use LangGraph `MemorySaver` to checkpoint after EVERY node).
> 2. **Edge Case - API Timeout**: If the `parallel_verify` node calls MCA/GST and it times out > 5 seconds, the circuit breaker must trip. The state must transition to `complete` BUT with a flag `account_tier = "limited"` and `verification_pending = True`. 
> 3. **Kafka Audit**: Every node transition must produce a JSON event to a Kafka topic named `audit.vyapaar` containing `timestamp`, `user_id`, `node_name`, `confidence_score`, and `input_summary`.
> 4. **Idempotency**: All endpoints must accept an `X-Idempotency-Key` header. Store this in Redis for 24 hours to block duplicate submissions.
> 
> **🔁 Looping Instruction (Self-Healing):**
> - After writing the core code, write a `test_hardness.py` script that does the following:
>   - Mocks the MCA API to **hang for 10 seconds**.
>   - Triggers the onboarding flow.
> - **Loop Phase 1:** Run `test_hardness.py` mentally. It will FAIL because the graph will hang.
> - **Loop Phase 2:** Rewrite the `parallel_verify` node to inject the Circuit Breaker wrapper. If the breaker opens, set `state = "deferred_verification"` and schedule a Celery task.
> - **Loop Phase 3:** Rerun the mental test. This time it PASSES (flow completes in 3 seconds, account is "limited").
> - **Final Deliverable:** Provide the final code for `graph.py`, `circuit_breaker.py`, and the passing `test_hardness.py`.
