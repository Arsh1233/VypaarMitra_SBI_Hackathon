import logging
from vision_service import VisionService
from matcher_utils import evaluate_name_match

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def test_vision_edge_case():
    logger.info("--- Testing VisionAgent Edge Case (Blurry Doc) ---")
    vision_service = VisionService()
    
    blurry_doc_meta = {"quality": 60, "liveness": 95, "type": "PAN"}
    
    # Attempt 1
    res1 = vision_service.process_document(blurry_doc_meta)
    logger.info(f"Attempt 1: {res1['status']} - {res1['message']}")
    assert res1["status"] == "retry_photo", f"Expected retry_photo, got {res1['status']}"
    
    # Attempt 2
    res2 = vision_service.process_document(blurry_doc_meta)
    logger.info(f"Attempt 2: {res2['status']} - {res2['message']}")
    assert res2["status"] == "retry_photo", f"Expected retry_photo, got {res2['status']}"
    
    # Attempt 3 (Should Escalate)
    res3 = vision_service.process_document(blurry_doc_meta)
    logger.info(f"Attempt 3: {res3['status']} - {res3['message']}")
    assert res3["status"] == "escalate_video_kyc", "Failed to escalate to video KYC on 3rd attempt!"
    
    logger.info("Vision Edge Case passed!\n")

def test_matcher_edge_case():
    logger.info("--- Testing MatcherAgent Edge Case (Name Mismatch) ---")
    pan_name = "Rajesh Sharma"
    gst_name = "Raj Sharm"
    
    result = evaluate_name_match(pan_name, gst_name)
    logger.info(f"PAN Name: {pan_name} | GST Name: {gst_name}")
    logger.info(f"Match Ratio: {result['match_ratio']:.2f}")
    logger.info(f"Account Tier Output: {result['account_tier']}")
    
    assert result['account_tier'] == "limited", "Failed to flag account as limited for mismatched names!"
    logger.info("Matcher Edge Case passed!\n")

if __name__ == "__main__":
    test_vision_edge_case()
    test_matcher_edge_case()
    logger.info("All AI hardness tests passed successfully! Green flags for both edge cases.")
