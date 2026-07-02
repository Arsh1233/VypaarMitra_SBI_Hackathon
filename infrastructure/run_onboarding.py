import sys
import os
import json
import time
from unittest.mock import patch

# Add backend to path so we can import the graph
sys.path.append(os.path.abspath("../backend/src"))
from graph import vyapaar_graph

DB_FILE = "db.json"
CHAOS_FLAG_FILE = "chaos.flag"

def read_db():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            return json.load(f)
    return {}

def write_db(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f)

def mock_mca_api_chaos(*args, **kwargs):
    if os.path.exists(CHAOS_FLAG_FILE):
        # Inject delay
        print("Chaos Injection: Mocking 10s hang... (Raising TimeoutError to simulate)")
        # In a real environment, requests.get with timeout=5 would raise this.
        raise TimeoutError("MCA API timed out after 5 seconds")
    return {"status": "success", "data": "MCA verified"}

def run_onboarding(user_id):
    initial_state = {
        "user_id": user_id,
        "idempotency_key": f"idemp_{user_id}",
        "input_summary": "Infra test flow",
        "confidence_score": 0.0,
        "verification_pending": False,
        "account_tier": "standard",
        "error": None
    }
    
    with patch('graph.call_mca_api', side_effect=mock_mca_api_chaos):
        result = vyapaar_graph.invoke(initial_state, config={"configurable": {"thread_id": user_id}})
        
    db = read_db()
    db[user_id] = {
        "account_tier": result["account_tier"],
        "verification_pending": result["verification_pending"],
        "created_at": time.time()
    }
    write_db(db)
    print(f"Onboarding completed for {user_id}. Final tier: {result['account_tier']}")

if __name__ == "__main__":
    run_onboarding("user_infra_1")
