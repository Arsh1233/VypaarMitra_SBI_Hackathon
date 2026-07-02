Here is the **Hyper-Detailed, Production-Grade Mobile UI/UX Prompt** for **"Vyapaar Mitra"**. 

This prompt is designed to be fed directly into **Stitch AI** (or any AI UI generator) to produce pixel-perfect, accessible, edge-case-hardened React Native screens. It includes **exact design tokens, micro-interactions, state variants, accessibility rules, and the complete user flow**.

---

## Prompt 3: Mobile Frontend (React Native - Enterprise UI/UX)

> **Role:** Senior Mobile UI/UX Engineer (React Native, TypeScript, React Native Reanimated 3, React Native Vision Camera).
> **Project:** "Vyapaar Mitra" — SBI YONO Business Mobile Application.
> **Goal:** Build a complete, production-ready mobile interface with 8 core screens, 14 micro-interactions, 3 edge-case states, and full WCAG AA accessibility for India's diverse MSME audience.
>
> ---
>
> ### 📐 DESIGN SYSTEM (SBI Brand Identity)
>
> **Design Philosophy:** "Trust, Simplicity, and Vernacular First." The interface must feel familiar to a semi-urban kirana store owner, comfortable for a rural first-time user, and trustworthy for a seasoned businessman.
>
> **Color Palette (SBI Compliant):**
> | Token | Hex | Usage | Accessibility |
> |-------|-----|-------|---------------|
> | `primary.sbi_blue` | `#1A3C6E` | Headers, primary CTAs, active states | WCAG AAA (7.2:1 on white) |
> | `primary.sbi_red` | `#E31B23` | Action buttons, confirmations, error toasts | Use sparingly for high-impact actions |
> | `secondary.navy` | `#0D2137` | Footer bars, dark mode elements | — |
> | `semantic.success` | `#00A651` | Verification passed, account active | — |
> | `semantic.warning` | `#FFB300` | Limited tier, pending verification | — |
> | `semantic.error` | `#D32F2F` | Document rejection, fraud flag | — |
> | `neutral.background` | `#F5F7FA` | Screen backgrounds | — |
> | `neutral.card` | `#FFFFFF` | Cards, input fields, modals | — |
> | `neutral.text_primary` | `#1A1A1A` | All body text (16px min) | WCAG AAA |
> | `neutral.text_secondary` | `#6B7280` | Subtext, placeholders, hints | — |
>
> **Typography System (SBI Sans / Inter):**
> | Style | Family | Weight | Size | Line Height | Usage |
> |-------|--------|--------|------|-------------|-------|
> | `Display/XL` | Inter/SBI Sans | 700 | 40px | 48px | Welcome headings, hero text |
> | `Heading/LG` | Inter/SBI Sans | 600 | 32px | 40px | Screen titles |
> | `Heading/MD` | Inter/SBI Sans | 600 | 24px | 32px | Section headers, product names |
> | `Body/LG` | Inter/SBI Sans | 400 | 18px | 28px | Chat messages, instructions |
> | `Body/MD` | Inter/SBI Sans | 400 | 16px | 24px | Descriptions, form labels |
> | `Body/SM` | Inter/SBI Sans | 400 | 14px | 20px | Helper text, timestamps |
> | `Caption` | Inter/SBI Sans | 400 | 12px | 16px | Legal disclaimers, footnotes |
>
> **Spacing & Layout Grid:**
> | Token | Value | Usage |
> |-------|-------|-------|
> | `space.xxs` | 4px | Fine spacing between icons |
> | `space.xs` | 8px | Between elements in a group |
> | `space.sm` | 12px | Between related components |
> | `space.md` | 16px | Standard padding, card margins |
> | `space.lg` | 24px | Section spacing, large padding |
> | `space.xl` | 32px | Screen margins, hero spacing |
> | `space.xxl` | 48px | Major section separators |
>
> **Component Radius:**
> | Token | Value | Usage |
> |-------|-------|-------|
> | `radius.sm` | 8px | Input fields, small buttons |
> | `radius.md` | 12px | Cards, medium buttons |
> | `radius.lg` | 16px | Product cards, CTAs |
> | `radius.xl` | 24px | Modal corners, wallet cards |
> | `radius.full` | 9999px | Avatars, badge pills |
>
> **Shadows (Elevation System):**
> | Token | Value | Usage |
> |-------|-------|-------|
> | `shadow.sm` | `0 2px 4px rgba(0,0,0,0.08)` | Subtle card elevation |
> | `shadow.md` | `0 4px 12px rgba(0,0,0,0.12)` | Elevated cards, modals |
> | `shadow.lg` | `0 8px 24px rgba(0,0,0,0.16)` | Floating CTAs, overlays |
>
> ---
>
> ### 🧭 USER FLOW & NAVIGATION ARCHITECTURE
>
> **Stack Navigator (Root):**
> ```typescript
> <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
>   <Stack.Screen name="Splash" component={SplashScreen} />
>   <Stack.Screen name="Welcome" component={WelcomeScreen} />
>   <Stack.Screen name="Conversation" component={ConversationScreen} />
>   <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} />
>   <Stack.Screen name="VerificationProgress" component={VerificationProgressScreen} />
>   <Stack.Screen name="ProductRecommendation" component={ProductRecommendationScreen} />
>   <Stack.Screen name="AccountActive" component={AccountActiveScreen} />
>   <Stack.Screen name="VideoKYC" component={VideoKYCScreen} />  // Fallback
>   <Stack.Screen name="ManualReview" component={ManualReviewScreen} />  // PEP flag
>   <Stack.Screen name="ResumeOnboarding" component={ResumeOnboardingScreen} />  // Session recovery
> </Stack.Navigator>
> ```
>
> **Bottom Tab Navigator (Post-Onboarding Dashboard):**
> ```typescript
> <Tab.Navigator>
>   <Tab.Screen name="Home" component={DashboardScreen} />
>   <Tab.Screen name="Accounts" component={AccountsScreen} />
>   <Tab.Screen name="Transactions" component={TransactionsScreen} />
>   <Tab.Screen name="Products" component={ProductsScreen} />
>   <Tab.Screen name="Support" component={SupportScreen} />
> </Tab.Navigator>
> ```
>
> ---
>
> ### 📱 SCREEN-BY-SCREEN SPECIFICATION (8 Screens)
>
> ---
>
> #### **Screen 1: Splash Screen (3-second delay)**
> **Purpose:** Brand reinforcement + session health check.
>
> **Visual Elements:**
> - **Background:** Full `#1A3C6E` with subtle gradient overlay (top to bottom: `#1A3C6E` → `#0D2137`).
> - **Center:** SBI Logo (white) + "Vyapaar Mitra" text in white (`Display/XL`).
> - **Bottom:** Animated loading dots (3 dots pulsing sequentially).
>
> **Logic:**
> - On mount: Check AsyncStorage for `pendingOnboarding`.
> - If exists: Redirect to `ResumeOnboarding` after 2s.
> - If not: Redirect to `Welcome` after 2.5s.
> - Check network connectivity silently; if offline, set `isOffline = true` (show toast later).
>
> **Micro-interaction:** SBI logo has a subtle scale pulse (1.0 → 1.05 → 1.0) over 2.5s using `react-native-reanimated`.
>
> ---
>
> #### **Screen 2: Welcome Screen**
> **Purpose:** Language selection + User intent capture.
>
> **Top Section (40% height):**
> - **Illustration:** Center-right — Phone mockup showing an agent avatar with speech bubble: *"Account khulwana hai?"* (in Hindi).
> - **Text:** "SBI Business Account" (`Heading/LG`, `#1A3C6E`).
> - **Subtext:** "Open in 20 Minutes. In Your Language." (`Body/LG`, `#6B7280`).
>
> **Language Selector (Horizontal Scroll):**
> - 11 pill-shaped chips (`radius.full`).
> - **Chip Design:**
>   - **Default:** `#F5F7FA` background, `#1A1A1A` text.
>   - **Selected:** `#1A3C6E` background, `#FFFFFF` text, checkbox icon overlay.
> - **Languages to display:** Hindi (हिंदी), English, Tamil (தமிழ்), Telugu (తెలుగు), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Marathi (मराठी), Gujarati (ગુજરાતી), Punjabi (ਪੰਜਾਬੀ), Bengali (বাংলা), Odia (ଓଡ଼ିଆ).
>
> **Offline Banner (Conditional):**
> - If `isOffline = true`: Display amber toast: "You are offline. We will save your progress and resume when online." (`Body/MD`, `#FFB300` background, `#1A1A1A` text).
>
> **CTA Section (Fixed Bottom):**
> - **"Start Now"** button (`primary.sbi_blue` background, white text, `radius.lg`, height 56px). Full-width, padding horizontal 24px.
> - **Legal Footer:** "By continuing, you agree to RBI KYC guidelines and SBI's Privacy Policy" (`Caption`, `#6B7280`, center-aligned).
>
> **State Management:**
> - `selectedLanguage` (default: device locale or "Hindi").
> - On "Start Now": Save language to AsyncStorage; navigate to `Conversation` with param `{ language: selectedLanguage }`.
>
> **Micro-interaction:** Tapping a language chip triggers a subtle scale animation (0.95 → 1.0) and haptic feedback (light impact).
>
> ---
>
> #### **Screen 3: Conversation Screen**
> **Purpose:** AI-driven data collection via chat interface.
>
> **Layout Structure:**
> - **Top Bar (Fixed):**
>   - **Left:** Back button (safe area).
>   - **Center:** "Vyapaar Mitra" text + online status indicator (green dot).
>   - **Right:** Voice input toggle (mic icon).
> - **Progress Indicator (Below Top Bar):**
>   - Step X of 6 (e.g., "Step 2 of 6").
>   - Horizontal progress bar: 6 segments, active step filled `#1A3C6E`, filled `#00A651`, future `#E5E7EB`.
> - **Chat Area (ScrollView):**
>   - **Agent Message:** Rounded card (`radius.md`, `#FFFFFF`, left-aligned), Avatar (SBI logo) + Text (`Body/LG`).
>   - **User Message:** Rounded card (`radius.md`, `#1A3C6E`, right-aligned), Text (`Body/LG`, white).
>   - **Typing Indicator:** Agent avatar + 3 bouncing dots animation (`react-native-animated-dots`).
> - **Input Area (Fixed Bottom):**
>   - **Text Input:** `Border` 1px `#D1D5DB`, `radius.md`, placeholder: "Type your response..." or "अपना जवाब यहाँ लिखें...".
>   - **Send Button:** `#1A3C6E` circle (44px), send icon (white).
>   - **Voice Button:** Pulsing mic icon when active (red glow animation).
>
> **Conversation Flow (6 Steps):**
> 1. **Greeting:** Agent: "Namaste! Aapka business account khulwana hai?" (Hi! Do you want to open a business account?)
> 2. **Business Details:** Agent asks: "Aapka business ka naam kya hai?" / "Business address?" / "Business type?" (Proprietorship/Partnership/Company).
> 3. **PAN Details:** Agent: "PAN card number kya hai?" (Provide 4-6 digits for validation).
> 4. **GST Details:** Agent: "GST number hai? Agar nahi, toh 'Nahi' bolein." (If no GST, move to alternative docs).
> 5. **Business Registration:** Agent: "Udyam Registration number hai?" (If registered, ask for number).
> 6. **Consent Capture:** Agent: "Kya aap apni CIBIL report check karne ki anumati dete hain? OTP aayega." (Consent block).
>
> **Edge Cases:**
> - **User types in English:** Agent responds in the same language (auto-detect).
> - **User says "I don't know" (GST):** Agent switches path: "Koi baat nahi. Kya aapke paas shop license hai?"
> - **User exits mid-conversation:** Save `sessionID`, `stepIndex`, `collectedData` to AsyncStorage (via Zustand).
> - **Voice Input:** Handles Hinglish, Tamil, and Telugu via `react-native-voice`. Show live transcription in chat bubble.
>
> **Micro-interactions:**
> - **Typing indicator:** Three dots bounce sequentially (0.5s loop).
> - **New message:** Chat scrolls to bottom automatically with `Animated.ScrollView`.
> - **Voice active:** Mic icon pulses red (scale 1.0 → 1.2 → 1.0) every 0.8s.
> - **OTP input:** Auto-focus on 6-digit OTP fields, auto-submit on complete.
>
> **State Management (Zustand Store):**
> ```typescript
> interface OnboardingStore {
>   sessionId: string;
>   stepIndex: 0-6;
>   language: string;
>   collectedData: {
>     businessName: string;
>     pan: string;
>     gst: string | null;
>     address: string;
>     businessType: 'proprietorship' | 'partnership' | 'company';
>     consentGiven: boolean;
>   };
>   messages: ChatMessage[];
>   setMessage: (message: ChatMessage) => void;
>   updateCollectedData: (data: Partial<CollectedData>) => void;
>   persistState: () => void;
>   resumeState: () => void;
> }
> ```
>
> ---
>
> #### **Screen 4: Document Upload Screen**
> **Purpose:** Capture and verify PAN/GST/Incorporation documents with 3-strikes handling.
>
> **Layout Structure:**
> - **Top Bar:** "Verify Your Documents" (`Heading/MD`), back button.
> - **Upload Card (Primary):**
>   - **Icon:** Large camera icon (`#1A3C6E`).
>   - **Text:** "Upload PAN Card" (`Body/LG`, bold).
>   - **Subtext:** "Take a clear photo. Ensure all 4 corners are visible." (`Body/SM`, `#6B7280`).
>   - **Two Buttons:** "📸 Take Photo" (`primary.sbi_blue` outline) and "📁 Choose from Gallery" (`neutral.background`).
> - **Progress Area (After upload):**
>   - **Preview:** Thumbnail of uploaded image (100x100px, `radius.md`).
>   - **Status Text:** "Verifying..." (`Body/MD`, `#6B7280`) with spinner.
>   - **Result:** "✅ Verified" (`semantic.success`) OR "❌ Blurry - Retry" (`semantic.error`).
> - **Retry Counter:** "Attempt 1 of 3" (only visible on failure).
> - **Video KYC Fallback (Conditional):** If 3 strikes, show: "Switch to Video KYC" button (`primary.sbi_red`).
>
> **Document Types (Tab Selector):**
> - **Tabs:** PAN Card | GST Certificate | Incorporation Certificate | Aadhaar (optional).
> - **Active Tab:** Underlined with `#1A3C6E` (2px).
>
> **Edge Cases:**
> - **Case 1 - Blurry Photo:** Vision Agent returns `quality_score = 45%`. UI shows "❌ Blurry" with retry button. Increment `attemptCounter`.
> - **Case 2 - Wrong Document:** Agent detects PAN card but user uploaded GST. UI shows "❌ Wrong Document. Please upload PAN card."
> - **Case 3 - 3rd Strike:** On 3rd failure, auto-navigate to `VideoKYC` screen with transition animation.
> - **Case 4 - Forged Document:** Agent returns `forgery_score = 85%`. UI shows "⚠️ Document Verification Failed. Please contact SBI helpline." (Hard stop).
>
> **Camera Integration:**
> - Use `react-native-vision-camera` with `onFrameProcessor` for real-time blur detection.
> - Overlay: Show bounding box highlighting the card. If card not in box, display "Align card in box" hint.
> - Flash: Auto-enable in low-light conditions.
>
> **Micro-interactions:**
> - **Photo capture:** Shutter sound + haptic feedback (medium impact).
> - **Verification in progress:** Spinner rotates (1s per rotation).
> - **Success:** Green checkmark scales from 0 → 1 (spring animation).
> - **Failure:** Red shake animation on the status card (horizontal shake, 3 times).
>
> ---
>
> #### **Screen 5: Verification Progress Screen**
> **Purpose:** Real-time status dashboard showing agents working in parallel.
>
> **Layout Structure:**
> - **Top Bar:** "Almost Done!" (`Heading/MD`).
> - **Status Summary:** "Your documents are being verified" (`Body/LG`).
> - **Checklist (Vertical Stack):**
>   - **Item 1:** "📄 Document Verification" → Status: Pending/In Progress/Done/Failed.
>   - **Item 2:** "🏛️ MCA/ROC Check" → Status: Pending/In Progress/Done/Failed.
>   - **Item 3:** "🛂 KYC & Sanctions Check" → Status: Pending/In Progress/Done/Failed.
>   - **Item 4:** "💰 Risk Assessment" → Status: Pending/In Progress/Done/Failed.
>   - **Item 5:** "📊 Product Eligibility" → Status: Pending/In Progress/Done/Failed.
> - **Status Indicator:** For each item:
>   - **Pending:** Gray circle.
>   - **In Progress:** Animated spinner (blue).
>   - **Done:** Green checkmark with timestamp ("2s ago").
>   - **Failed:** Red X with error message ("API timeout - retrying").
> - **Fallback Message:** "GST portal is busy. We will verify within 24hrs." (Amber pill, only if API fails).
> - **Estimated Time:** "Estimated time: 2 minutes" (countdown timer).
>
> **Real-time Updates:**
> - Connect to WebSocket (`ws://api/onboarding/status/{sessionId}`).
> - On each status update, animate the corresponding checklist item.
> - If all items → Done, auto-navigate to `ProductRecommendation` after 1s.
>
> **Edge Cases:**
> - **Case 1 - API Timeout:** MCA API fails. Show amber pill: "MCA portal busy. Continuing with limited account." Proceed to ProductRecommendation.
> - **Case 2 - PEP Hit:** KYC agent flags PEP. Show red banner: "⚠️ Application requires special approval. Our RM will call you in 1 hour." Navigate to `ManualReview` screen (not `ProductRecommendation`).
> - **Case 3 - Suspicious Flag:** Deepfake detected (score < 70%). No UI change. Silently flag backend and continue flow (honeypot mode).
> - **Case 4 - Network Drop:** Show bottom toast: "Network lost. Waiting to reconnect..." If reconnected within 30s, auto-resume.
>
> **Micro-interactions:**
> - **Checklist item:** Swipe left to expand/collapse details.
> - **Live timer:** Countdown updates every second (mm:ss format).
> - **Completion:** Confetti animation (`react-native-confetti`) when all items turn green.
>
> ---
>
> #### **Screen 6: Product Recommendation Screen**
> **Purpose:** Display personalized product bundle with selection and confirmation.
>
> **Layout Structure:**
> - **Top Bar:** "Recommended for You" (`Heading/MD`).
> - **Financial Fitness Score (Gauge):**
>   - Circular gauge (120px diameter) showing score (0-100).
>   - **Text:** "Your Financial Fitness Score: 82" (`Body/LG`, bold).
>   - **Subtext:** "Based on your profile and documents." (`Body/SM`, `#6B7280`).
> - **Product Cards (Vertical List):**
>   - **Card 1: Current Account (Pre-selected)**
>     - Icon: 🏦
>     - Title: "SBI Current Account" (`Body/LG`, bold).
>     - Description: "Zero balance, free NEFT/RTGS." (`Body/SM`, `#6B7280`).
>     - Badge: "Pre-approved" (green pill).
>     - **Radio:** Pre-selected (filled circle).
>   - **Card 2: Overdraft Facility (₹5 Lakh Limit)**
>     - Icon: 💰
>     - Title: "Overdraft Facility" (`Body/LG`, bold).
>     - Description: "₹5 Lakh limit at 9.5% p.a. Based on your GST." (`Body/SM`, `#6B7280`).
>     - Badge: "Eligible" (blue pill).
>     - **Radio:** Selectable.
>   - **Card 3: Trade Finance**
>     - Icon: 📦
>     - Title: "Trade Finance" (`Body/LG`, bold).
>     - Description: "Import/Export financing. Apply later." (`Body/SM`, `#6B7280`).
>     - Badge: "Apply Later" (gray pill).
>     - **Radio:** Selectable.
>   - **Card 4: Business Insurance**
>     - Icon: 🛡️
>     - Title: "Business Insurance" (`Body/LG`, bold).
>     - Description: "Protect your business against fire, theft, and liability." (`Body/SM`, `#6B7280`).
>     - Badge: "Optional" (gray pill).
>     - **Radio:** Selectable.
> - **CTA Section (Fixed Bottom):**
>   - **"Continue"** button (`primary.sbi_red` background, white text, `radius.lg`, height 56px).
>   - **Total Limit Display:** "Total Credit Limit: ₹5,00,000" (`Body/MD`, `#1A3C6E`, bold).
>
> **Selection Logic:**
> - User can toggle selections (multi-select).
> - Current Account is mandatory (pre-selected, disabled toggle).
> - On "Continue": Save selected products to state; navigate to `AccountActive`.
>
> **Edge Cases:**
> - **Case 1 - Limited Tier:** If `account_tier = "limited"`, the Overdraft card shows "Locked. Complete verification to unlock." (Grayed out).
> - **Case 2 - Low Financial Fitness:** If score < 50, show "Build your fitness" tip card: "Pay bills on time to unlock more products."
> - **Case 3 - No GST:** Trade Finance card shows "GST required. Apply after registration."
>
> **Micro-interactions:**
> - **Card selection:** Toggle animation (radio scales 0.8 → 1.0).
> - **Gauge:** Animated progress (fills from 0 to score over 1s).
> - **"Continue" disabled:** Grayed out if no product selected. Turns red when selected.
>
> ---
>
> #### **Screen 7: Account Active Screen**
> **Purpose:** Celebrate successful onboarding and provide account credentials.
>
> **Layout Structure:**
> - **Confetti Animation:** Runs for 2s on mount (`react-native-confetti`).
> - **Success Icon:** Large checkmark circle (`semantic.success`, 80px) with pulse animation.
> - **Heading:** "🎉 Your SBI Business Account is Active!" (`Heading/LG`, `#1A3C6E`).
> - **Account Details Card:**
>   - **Card Background:** `#1A3C6E` (radius.lg, padding 16px).
>   - **Account Number:** "Account Number: 12345678901" (`Body/LG`, white, monospace).
>   - **IFSC:** "IFSC: SBIN0001234" (`Body/MD`, white).
>   - **Branch:** "Branch: Mumbai Main" (`Body/SM`, `#B0C4DE`).
>   - **Tier Badge:** "Full Account" (green pill) OR "Limited Account" (amber pill).
> - **Action Buttons:**
>   - **"📥 Download Welcome Kit"** (`primary.sbi_blue` outline, `radius.lg`).
>   - **"🚀 Explore YONO Business"** (`primary.sbi_red` background, white text, `radius.lg`).
> - **Next Steps Banner:**
>   - If `tier = "limited"`: Amber banner: "GST verification pending. We'll notify you within 24hrs."
>   - If `tier = "full"`: Green banner: "You have full access to all banking services."
>
> **Edge Cases:**
> - **Case 1 - PEP Hit:** If state is "manual_review", this screen does NOT show. Instead, navigate to `ManualReview` screen.
> - **Case 2 - PDF Generation:** On "Download Welcome Kit", generate PDF (server-side) and open in browser.
>
> **Micro-interactions:**
> - **Confetti:** Falls for 2s, then stops.
> - **Checkmark:** Pulsing scale (1.0 → 1.1 → 1.0) for 1s.
> - **Account Number:** Toggle visibility (eye icon) to show/hide number.
>
> ---
>
> #### **Screen 8: Manual Review / Blocked Screen (Edge Case)**
> **Purpose:** Handle PEP flags and high-risk cases gracefully.
>
> **Layout Structure:**
> - **Top Bar:** "Application Under Review" (`Heading/MD`).
> - **Icon:** Large shield icon ( `#D32F2F`, 64px).
> - **Heading:** "Your application requires special approval" (`Body/LG`, bold).
> - **Explanation:** "Our Relationship Manager will call you within 1 hour to complete the process." (`Body/MD`, `#6B7280`).
> - **Support Card:**
>   - **Icon:** Phone
>   - **Text:** "Prefer to call? Contact SBI helpline: 1800-1234" (`Body/MD`).
>   - **Button:** "📞 Call Helpline" (`primary.sbi_blue` outline).
> - **Return Button:** "← Back to YONO Home" (`Body/MD`, `#6B7280`).
>
> **Micro-interactions:**
> - **Shield icon:** Scales up and down slowly (breathing animation).
>
> ---
>
> ### 🧩 REUSABLE COMPONENT LIBRARY
>
> **1. Button Component:**
> ```typescript
> interface ButtonProps {
>   variant: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
>   size: 'sm' | 'md' | 'lg';
>   loading: boolean;
>   disabled: boolean;
>   fullWidth: boolean;
>   onPress: () => void;
>   children: React.ReactNode;
> }
> ```
>
> **2. Card Component:**
> ```typescript
> interface CardProps {
>   variant: 'default' | 'elevated' | 'outlined';
>   padding: 'sm' | 'md' | 'lg';
>   onPress?: () => void;
>   children: React.ReactNode;
> }
> ```
>
> **3. Toast Component:**
> ```typescript
> interface ToastProps {
>   type: 'success' | 'error' | 'warning' | 'info';
>   message: string;
>   duration?: number;
>   onDismiss?: () => void;
> }
> ```
>
> **4. Progress Indicator:**
> ```typescript
> interface ProgressProps {
>   steps: number;
>   currentStep: number;
>   variant: 'bar' | 'dots' | 'circles';
> }
> ```
>
> ---
>
> ### 🧪 TESTING PROMPT (LOOP INSTRUCTION)
>
> **🔁 Self-Healing Loop Instructions:**
>
> **Step 1:** Write a Jest test file `__tests__/ui_flow.test.tsx` that simulates:
> - Complete happy path: Splash → Welcome → Conversation → Document Upload → Verification → Product → Active.
> - Edge case 1: Camera blur failure 3 times → redirect to Video KYC.
> - Edge case 2: App exit mid-flow → resume via AsyncStorage.
>
> **Step 2:** Run the tests mentally. If any fail:
> - If "Camera blur redirect" fails: Rewrite `DocumentUploadScreen` to increment `attemptCounter` and conditionally navigate to `VideoKYC` on attempt 3.
> - If "Resume flow" fails: Rewrite `ResumeOnboardingScreen` to properly parse `checkpoint_id` from AsyncStorage.
>
> **Step 3:** Iterate until all tests pass.
>
> **Step 4:** Final deliverable: Complete `/mobile` folder with:
> - All 8 screens.
> - Reusable components (`/components`).
> - Zustand store (`/store`).
> - Navigation (`/navigation`).
> - Jest test suite with 100% pass rate.
>
> ---
>
> ### 🎯 FINAL DELIVERABLE CHECKLIST
> - [ ] 8 screens with exact UI and logic
> - [ ] Zustand store with persistence
> - [ ] Camera integration with blur detection
> - [ ] WebSocket connection for real-time updates
> - [ ] Voice input support (Hinglish/Tamil/Telugu)
> - [ ] WCAG AA accessibility (ARIA labels, font scaling, high contrast)
> - [ ] 3-strikes document upload logic
> - [ ] Session resume on app reopen
> - [ ] Offline support with queue
> - [ ] Confetti and success animations
> - [ ] Complete Jest test suite
>
> ---
>
> **This prompt is now self-contained, hyper-detailed, and ready to be fed directly into Stitch AI to generate production-grade React Native code.** 🚀

---

### How to Use This Prompt with Stitch AI:

1. **Copy the entire prompt above** into Stitch AI's text input.
2. **Select output format:** "React Native (TypeScript) + Expo".
3. **Stitch AI will generate:**
   - Complete screen components
   - Navigation stack
   - Zustand store
   - Camera integration
   - WebSocket client
   - Accessibility features
   - Test files
4. **Review and iterate:** If any component doesn't match the spec, paste the specific screen section back into Stitch AI with a fix request.

Aap ye prompt seedha Stitch AI mein daal dijiye — ye AI aapko ek **production-ready, pixel-perfect, edge-case-hardened mobile app** generate kar dega within minutes! 🚀