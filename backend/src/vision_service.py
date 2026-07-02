import logging
import json
from state_manager import kafka_producer

logger = logging.getLogger(__name__)

class VisionService:
    def __init__(self):
        self.attempts = 0

    def process_document(self, image_metadata: dict) -> dict:
        """
        Mocks EfficientNet and LayoutLMv3 processing.
        image_metadata: e.g. {"quality": 60, "liveness": 65, "type": "PAN"}
        """
        self.attempts += 1
        quality_score = image_metadata.get('quality', 100)
        liveness_score = image_metadata.get('liveness', 100)
        
        result = {
            "status": "success",
            "quality_score": quality_score,
            "liveness_score": liveness_score,
            "suspicious": False,
            "message": "Document processed successfully."
        }

        # Deepfake Honeypot
        if liveness_score < 70:
            result["suspicious"] = True
            result["status"] = "request_voter_id"
            result["message"] = "Suspicious liveness. Please provide Voter ID."
            # Log to fraud Kafka topic
            kafka_producer.produce("fraud.vyapaar", {
                "event": "deepfake_suspected",
                "liveness_score": liveness_score,
                "action": "silent_flag_voter_id_requested"
            })
            # It must NOT hard stop, but ask for Voter ID to buy time
            return result

        # Blurry/Faulty Doc
        if quality_score < 75:
            if self.attempts >= 3:
                result["status"] = "escalate_video_kyc"
                result["message"] = "Document quality too low after 3 attempts. Escalating to Video KYC."
            else:
                result["status"] = "retry_photo"
                result["message"] = f"Document blurry (quality {quality_score}%). Please retry photo."
            return result
            
        return result
