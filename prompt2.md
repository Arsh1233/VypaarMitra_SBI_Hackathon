### Prompt 2: AI/ML Agents (CrewAI + Vision + Levenshtein + Deepfake)
**Copy this into Antigravity:**

> **Role:** Senior AI Engineer (Python, PyTorch, Hugging Face, CrewAI).
> **Project:** "Vyapaar Mitra" — Multi-Agent Intelligence Layer.
> **Goal:** Build a CrewAI crew that handles blurry docs, name mismatches, and zero-footprint customers.
> 
> **Absolute Requirements (No Compromises):**
> 1. **Crew Definition**: Create `crew.py` with 5 agents:
>    - `RegistryAgent` (Connects to MCA/GST mocks).
>    - `VisionAgent` (Uses `EfficientNet` + `LayoutLMv3` for OCR and forgery).
>    - `MatcherAgent` (Calculates Levenshtein ratio between PAN and GST names).
>    - `UBOAgent` (Parses shareholding patterns).
>    - `AlternativeScoringAgent` (Takes UPI/Utility data as input).
> 2. **Edge Case - Blurry/Faulty Doc**: The `VisionAgent` must output a `quality_score`. If `quality_score < 75%`, it returns `"retry_photo"`. If it fails 3 times, it returns `"escalate_video_kyc"`.
> 3. **Edge Case - Name Mismatch**: If `Levenshtein.ratio(pan_name, gst_name) < 0.9`, set `account_tier = "limited"` and send an alert to the Admin queue.
> 4. **Edge Case - Zero Footprint**: If MCA/GST returns 404, the `AlternativeScoringAgent` must parse a synthetic JSON of mobile recharges and electricity bills to generate a `financial_inclusion_score` (0-100).
> 5. **Deepfake Honeypot**: If liveness < 70%, the agent must NOT hard stop. It must silently flag `suspicious = True` and ask for a Voter ID (to buy time) while logging to the fraud Kafka topic.
> 
> **🔁 Looping Instruction (Self-Healing):**
> - Write `test_ai_hardness.py`.
> - **Loop 1:** Feed a blurry PAN card image to the VisionAgent. It will return `quality_score = 60%`.
> - **Loop 2:** Run the `test_ai_hardness.py` with a retry loop of 3. If it fails to escalate to "video_kyc" after the 3rd attempt, modify the `VisionAgent` logic to count attempts in the state.
> - **Loop 3:** Feed a PAN "Rajesh Sharma" and GST "Raj Sharm" (Mismatch > 10%). Ensure the `MatcherAgent` correctly flags `limited_tier`.
> - **Final Deliverable:** `crew.py`, `vision_service.py`, `matcher_utils.py`, and the `test_ai_hardness.py` showing Green flags for both edge cases.

