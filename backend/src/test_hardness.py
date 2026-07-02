import logging
from unittest.mock import patch
from graph import vyapaar_graph

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def test_circuit_breaker():
    # Setup initial state
    config = {"configurable": {"thread_id": "test_thread_1"}}
    initial_state = {
        "user_id": "user_123",
        "idempotency_key": "idemp_123",
        "input_summary": "Test flow",
        "confidence_score": 0.0,
        "verification_pending": False,
        "account_tier": "standard",
        "error": None
    }
    
    # Patch call_mca_api to simulate a timeout.
    # In a real scenario with requests.get(..., timeout=5), a 10s hang would result in a Timeout exception.
    # We simulate that exception here.
    def mock_mca_api(*args, **kwargs):
        logger.info("MOCK: call_mca_api called. Simulating 10s hang which triggers 5s timeout...")
        raise TimeoutError("MCA API timed out after 5 seconds")

    with patch('graph.call_mca_api', side_effect=mock_mca_api):
        logger.info("Starting graph execution with mocked MCA API...")
        # Invoke the graph
        result = vyapaar_graph.invoke(initial_state, config=config)
        
        logger.info("Graph execution completed.")
        logger.info(f"Final State: account_tier={result['account_tier']}, verification_pending={result['verification_pending']}, error={result['error']}")
        
        assert result['account_tier'] == 'limited', f"Expected account_tier 'limited', got {result['account_tier']}"
        assert result['verification_pending'] is True, "Expected verification_pending to be True"
        
        logger.info("Test Passed! Circuit breaker successfully handled the failure and fell back to limited tier.")

if __name__ == "__main__":
    test_circuit_breaker()
