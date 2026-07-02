import json
import logging
import time
from typing import Optional
from langgraph.checkpoint.memory import MemorySaver

logger = logging.getLogger(__name__)

class KafkaProducerMock:
    def produce(self, topic: str, message: dict):
        # Mocks producing a message to Kafka
        logger.info(f"KAFKA EMIT [{topic}]: {json.dumps(message)}")

kafka_producer = KafkaProducerMock()

def emit_audit_event(user_id: str, node_name: str, confidence_score: float, input_summary: str):
    """
    Produce a JSON event to a Kafka topic named `audit.vyapaar`.
    Contains: timestamp, user_id, node_name, confidence_score, and input_summary.
    """
    event = {
        "timestamp": time.time(),
        "user_id": user_id,
        "node_name": node_name,
        "confidence_score": confidence_score,
        "input_summary": input_summary
    }
    kafka_producer.produce("audit.vyapaar", event)

class IdempotencyManager:
    def __init__(self):
        # In-memory mock for Redis
        self._store = {}
        
    def is_duplicate(self, key: str) -> bool:
        if not key:
            return False
            
        if key in self._store:
            # Check expiration (24 hours = 86400 seconds)
            if time.time() - self._store[key] < 86400:
                return True
        return False
        
    def register(self, key: str):
        if key:
            self._store[key] = time.time()

idempotency_manager = IdempotencyManager()

def get_memory_saver() -> MemorySaver:
    return MemorySaver()
