### Prompt 3: Mobile Frontend (React Native + 3-Strikes + Session Resume)
**Copy this into Antigravity:**

> **Role:** Senior Mobile Engineer (React Native, TypeScript, Zustand).
> **Project:** "Vyapaar Mitra" — YONO Business Mobile App.
> **Goal:** Build a mobile UX that handles bad network, bad photos, and mid-flow exits.
> 
> **Absolute Requirements (No Compromises):**
> 1. **Screen Architecture**: Build 6 Screens (`Welcome`, `Chat`, `DocUpload`, `LiveStatus`, `Products`, `Active`) using `react-navigation`.
> 2. **State Persistence**: Use Zustand with `zustand-persist`. Save the entire LangGraph `checkpoint_id` and `step_index` to AsyncStorage.
> 3. **Edge Case - App Exit**: On app reload, check AsyncStorage for `pending_onboarding`. If found, redirect to the `LiveStatus` screen and call `POST /api/resume/{checkpoint_id}`.
> 4. **Edge Case - 3-Strikes Camera**: Integrate `react-native-vision-camera`. Use the `onFrameProcessor` to detect blur. If blur detected, show overlay "Hold Steady". Track attempts in state. On 3rd fail, automatically route to a "Video KYC" screen (using WebRTC).
> 5. **Edge Case - Network Drop**: Implement `react-native-offline`. If connection drops, queue the payload locally. Retry on reconnect. Show a banner: "We'll continue shortly".
> 
> **🔁 Looping Instruction (Self-Healing):**
> - Write `test_mobile_hardness.js` (simulated in Jest).
> - **Loop 1:** Mock an app exit (persist state, reload component). Ensure the `resumeOnboarding` function correctly parses the checkpoint and calls the API.
> - **Loop 2:** Mock 3 successive "blurry" callbacks from the camera. Ensure the navigation stack pushes to `VideoKycScreen` on the 3rd trigger.
> - **Loop 3:** If the `resume` API returns 404, the UI must reset to the `Welcome` screen with a toast "Session expired. Restarting."
> - **Final Deliverable:** The complete `/mobile` folder with `App.tsx`, `/screens`, `/store`, and the passing Jest test suite.
