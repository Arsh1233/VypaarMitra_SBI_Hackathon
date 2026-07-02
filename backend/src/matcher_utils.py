import logging
import Levenshtein
from state_manager import kafka_producer

logger = logging.getLogger(__name__)

def evaluate_name_match(pan_name: str, gst_name: str) -> dict:
    """
    Calculates Levenshtein ratio between PAN and GST names.
    If ratio < 0.9, flags account_tier as limited and sends an admin alert.
    """
    ratio = Levenshtein.ratio(pan_name.lower(), gst_name.lower())
    
    result = {
        "pan_name": pan_name,
        "gst_name": gst_name,
        "match_ratio": ratio,
        "account_tier": "standard"
    }
    
    if ratio < 0.9:
        logger.warning(f"Name mismatch detected! Ratio: {ratio:.2f} (< 0.9)")
        result["account_tier"] = "limited"
        
        # Send an alert to the Admin queue
        kafka_producer.produce("admin.alerts", {
            "event": "name_mismatch",
            "pan_name": pan_name,
            "gst_name": gst_name,
            "ratio": ratio,
            "action": "account_tier_downgraded_to_limited"
        })
        
    return result
