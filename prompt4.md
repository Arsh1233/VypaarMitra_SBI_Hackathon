Here is the **Hyper-Detailed, Production-Grade Web Frontend Prompt** for **"Vyapaar Mitra"**. 

This is designed to be fed directly into **Stitch AI**, **v0.dev**, or any AI UI generator to produce a pixel-perfect, enterprise-grade React + Tailwind dashboard. It covers the **Marketing Landing Page**, **Customer Dashboard**, **Admin Override Panel**, and **RBI Audit Log Viewer** with extreme precision.

---

## Prompt 4: Web Frontend (React + Tailwind - Enterprise Admin & Dashboard)

> **Role:** Senior Web UI/UX Engineer (React 18, TypeScript, Tailwind CSS 3, React Router v6, Recharts, Framer Motion).
> **Project:** "Vyapaar Mitra" — SBI Admin, Customer Dashboard & Marketing Landing.
> **Goal:** Build a complete, production-ready web application with 5 core pages, 12 reusable components, real-time WebSocket updates, WCAG AA accessibility, and full edge-case handling for SBI relationship managers and compliance officers.
>
> ---
>
> ### 📐 DESIGN SYSTEM (SBI Web Brand Identity)
>
> **Design Philosophy:** "Enterprise Trust, Operational Clarity, and Real-Time Control." The interface must feel authoritative for SBI admins, reassuring for customers, and extremely functional for compliance teams.
>
> **Color Palette (SBI Compliant):**
> | Token | Hex | Usage | Tailwind Class |
> |-------|-----|-------|----------------|
> | `primary.sbi_blue` | `#1A3C6E` | Primary CTAs, headers, active nav | `bg-sbi-blue` |
> | `primary.sbi_red` | `#E31B23` | Critical actions, delete, overrides | `bg-sbi-red` |
> | `secondary.navy` | `#0D2137` | Footer, dark mode sidebar | `bg-sbi-navy` |
> | `semantic.success` | `#00A651` | Verified, active, full account | `text-green-600` |
> | `semantic.warning` | `#FFB300` | Limited tier, pending, warnings | `text-amber-500` |
> | `semantic.error` | `#D32F2F` | PEP block, fraud flags, errors | `text-red-700` |
> | `neutral.background` | `#F5F7FA` | Page backgrounds | `bg-gray-50` |
> | `neutral.card` | `#FFFFFF` | Cards, modals, dropdowns | `bg-white` |
> | `neutral.text_primary` | `#1A1A1A` | All body text | `text-gray-900` |
> | `neutral.text_secondary` | `#6B7280` | Subtext, placeholders, hints | `text-gray-500` |
> | `neutral.border` | `#E5E7EB` | Borders, dividers | `border-gray-200` |
>
> **Typography System (Inter / SBI Sans):**
> | Style | Family | Weight | Size | Tailwind Class | Usage |
> |-------|--------|--------|------|----------------|-------|
> | `Display/XL` | Inter | 700 | 48px | `text-5xl font-bold` | Hero headlines |
> | `Heading/LG` | Inter | 600 | 32px | `text-3xl font-semibold` | Page titles |
> | `Heading/MD` | Inter | 600 | 24px | `text-2xl font-semibold` | Section headers |
> | `Heading/SM` | Inter | 600 | 20px | `text-xl font-semibold` | Card titles |
> | `Body/LG` | Inter | 400 | 18px | `text-lg` | Descriptions, lead text |
> | `Body/MD` | Inter | 400 | 16px | `text-base` | Body content, table cells |
> | `Body/SM` | Inter | 400 | 14px | `text-sm` | Helper text, badges |
> | `Caption` | Inter | 400 | 12px | `text-xs` | Disclaimers, footnotes |
>
> **Spacing & Layout Grid (8px Grid System):**
> | Token | Value | Tailwind Class | Usage |
> |-------|-------|----------------|-------|
> | `space.xs` | 8px | `gap-2`, `p-2` | Tight elements |
> | `space.sm` | 12px | `gap-3`, `p-3` | Related groups |
> | `space.md` | 16px | `gap-4`, `p-4` | Standard padding |
> | `space.lg` | 24px | `gap-6`, `p-6` | Section spacing |
> | `space.xl` | 32px | `gap-8`, `p-8` | Page margins, hero |
> | `space.xxl` | 48px | `gap-12`, `p-12` | Major separators |
>
> **Layout Grid:**
> - **Sidebar:** Fixed width = 280px (`w-72`). Contains logo, navigation, user profile.
> - **Main Content:** `ml-72` (pushes right). Max width = 1280px (`max-w-7xl`), centered with `mx-auto`.
> - **Cards:** `rounded-xl`, `shadow-sm` (elevation 1), `bg-white`, `border border-gray-100`.
>
> **Shadows:**
> | Token | Value | Usage |
> |-------|-------|-------|
> | `shadow.sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle cards |
> | `shadow.md` | `0 4px 12px rgba(0,0,0,0.08)` | Elevated cards, dropdowns |
> | `shadow.lg` | `0 8px 24px rgba(0,0,0,0.12)` | Modals, flyouts |
> | `shadow.xl` | `0 12px 48px rgba(0,0,0,0.18)` | Overlays, critical modals |
>
> ---
>
> ### 🧭 ROUTING ARCHITECTURE
>
> ```typescript
> // routes.ts
> const routes = {
>   public: [
>     { path: '/', component: LandingPage, layout: 'public' },
>   ],
>   private: [
>     { path: '/dashboard', component: CustomerDashboard, layout: 'private' },
>     { path: '/accounts', component: AccountsPage, layout: 'private' },
>     { path: '/transactions', component: TransactionsPage, layout: 'private' },
>     { path: '/products', component: ProductsPage, layout: 'private' },
>     { path: '/support', component: SupportPage, layout: 'private' },
>   ],
>   admin: [
>     { path: '/admin/queue', component: AdminQueue, layout: 'admin' },
>     { path: '/admin/audit', component: AuditLogs, layout: 'admin' },
>     { path: '/admin/override/:userId', component: OverrideModal, layout: 'admin' },
>   ]
> };
> ```
>
> **Layout Components:**
> - `PublicLayout`: No sidebar, full-width hero.
> - `PrivateLayout`: Customer sidebar (240px) + Top nav (64px).
> - `AdminLayout`: Admin sidebar (240px) + Compliance banner (top).
>
> ---
>
> ### 📱 PAGE-BY-PAGE SPECIFICATION (5 Core Pages)
>
> ---
>
> #### **Page 1: Landing Page (Public)**
> **Purpose:** Acquisition funnel and brand trust building.
>
> **Layout Structure:**
> - **Header (Fixed Top):**
>   - Left: SBI Logo (SVG) + "Vyapaar Mitra" text (`Heading/SM`, `#1A3C6E`).
>   - Right: "Download App" button (`primary.sbi_blue`, `radius.lg`, `text-sm`).
> - **Hero Section (Background: Gradient from `#1A3C6E` to `#0D2137`):**
>   - Left Content (60% width):
>     - Badge: "🚀 GFF 2026 Innovation" (amber pill, `#FFB300` background).
>     - Heading: "Open Your SBI Business Account in **20 Minutes**" (`Display/XL`, white).
>     - Subtext: "No branch visit. No paperwork. In your language." (`Body/LG`, `#B0C4DE`).
>     - Stats Row: "6.3 Cr MSMEs" | "11+ Languages" | "100% Digital" (white, `Body/MD`).
>     - CTA: "Start Now →" (`primary.sbi_red`, `px-8 py-4`, `radius.lg`, large).
>   - Right Content (40% width):
>     - **Phone Mockup:** SVG of mobile phone with the Conversation Screen (Step 3) inside.
>     - Floating elements: "✅ PAN Verified", "✅ GST Verified" (popping out dynamically).
> - **Features Section (Background: `neutral.background`):**
>   - Heading: "Why Vyapaar Mitra?" (`Heading/LG`, center).
>   - 4 Feature Cards (Grid, 4 cols):
>     1. 🗣️ "11+ Indian Languages" – Voice + Text support.
>     2. 📱 "No Branch Visit" – 100% remote onboarding.
>     3. ⏰ "24/7 Assistance" – AI agent always available.
>     4. 🎯 "Instant Product Recommendations" – Overdraft + Trade Finance.
> - **Trust Section (Background: `neutral.card`):**
>   - Logos Row: "SBI – India's Largest Bank" | "RBI Compliant" | "100% Secure" | "ISO 27001".
>   - Quote: *"Security and trust are our foundation."* – SBI Chairman.
> - **Footer:**
>   - SBI Logo + "© 2026 State Bank of India. All rights reserved."
>   - Links: Privacy Policy | Terms of Service | RBI Guidelines | Contact.
>
> **Edge Cases:**
> - **Mobile Responsive:** Stack hero columns (left above right). Stack feature cards to 2 cols on tablet, 1 col on mobile.
> - **Performance:** Lazy load phone mockup SVG. Use `next/image` or optimized webp.
>
> **Micro-interactions:**
> - **Hero CTA:** Hover → scale (1.05) + shadow-lg.
> - **Feature Cards:** Hover → translateY(-4px) + shadow-md.
> - **Stats Counter:** Animated number count (0 → 6.3 Cr) on scroll.
>
> ---
>
> #### **Page 2: Customer Dashboard (Private)**
> **Purpose:** Post-onboarding hub for account management and financial fitness.
>
> **Layout Structure (PrivateLayout):**
> - **Top Nav (64px):**
>   - Left: "Vyapaar Mitra" text + online status indicator (green dot, "All systems operational").
>   - Center: Search bar (placeholder: "Search products, transactions...").
>   - Right: Notification bell (with badge), User Avatar (initials), dropdown.
> - **Left Sidebar (240px):**
>   - **Sections:** Dashboard (active), Accounts, Transactions, Loans, Trade Finance, Insurance, Support.
>   - **Active State:** `#1A3C6E` background, white text, left border (4px solid `#E31B23`).
>   - **Bottom:** Logout button + version number (v2.0.1).
> - **Main Content Area (Padding: `p-8`):**
>   - **Top Banner:**
>     - **Full Account (Green):** "🎉 Welcome, Rajesh! Your account is fully active." (`semantic.success` background, `text-white`).
>     - **Limited Account (Amber):** "⚠️ Verification pending. GST portal is busy. We'll upgrade you within 24hrs." (`semantic.warning` background, `text-gray-900`).
>     - **PEP Blocked (Red - rare):** "🚫 Account under review. RM will call in 1 hour." (`semantic.error` background, `text-white`).
>   - **Metrics Row (3 Cards):**
>     - Card 1: "Account Balance" → "₹1,45,230" (`Heading/LG`) + "Available" (`Body/SM`, `#6B7280`).
>     - Card 2: "Financial Fitness Score" → Gauge chart (Recharts - donut chart, 82/100).
>     - Card 3: "Products Active" → "2/4" (`Heading/LG`) + "Current + Overdraft".
>   - **Recommended Products (Horizontal Scroll):**
>     - 3 Product Cards (width: 320px each, `shadow-sm`).
>     - Each Card: Icon, Title, Description, "Apply Now" button (outline).
>   - **Recent Transactions (Table):**
>     - Columns: Date | Description | Amount | Status (Green: Success, Red: Failed).
>     - Limit: Show last 5 rows, "View All" link.
>   - **Quick Action (Floating):**
>     - "Ask YONO Ji" button (`primary.sbi_red`, `radius.full`, fixed bottom-right).
>     - Click opens a modal chat window (embedded iframe or component).
>
> **State Management (Redux Toolkit / Zustand):**
> ```typescript
> interface DashboardStore {
>   user: { name: string; tier: 'full' | 'limited' | 'blocked'; accountNumber: string };
>   balance: number;
>   fitnessScore: number;
>   products: Product[];
>   transactions: Transaction[];
>   notifications: Notification[];
>   fetchDashboardData: () => Promise<void>;
>   connectWebSocket: () => void;  // Real-time updates
> }
> ```
>
> **Real-Time Updates (WebSocket):**
> - Connect to `ws://api/ws/dashboard/{userId}`.
> - Listen for events: `account.upgraded`, `transaction.new`, `notification.alert`.
> - Show toast notification on event arrival (top-right).
>
> **Edge Cases:**
> - **Empty State:** If no transactions, show: "No transactions yet. Start using your account today!" (Center illustration).
> - **Low Fitness Score:** If score < 50, show tip banner: "Pay bills on time to improve your score." (Info card).
>
> **Micro-interactions:**
> - **Metrics Cards:** Hover → shadow-md, scale(1.02).
> - **Gauge Chart:** Animated fill on load (0 → 82 over 1.5s).
> - **Notification Bell:** Bounce animation on new notification.
>
> ---
>
> #### **Page 3: Admin Queue (Critical - Compliance & Override)**
> **Purpose:** Real-time queue for PEP flags, suspicious activities, and manual override requests.
>
> **Layout Structure (AdminLayout):**
> - **Admin Top Bar:** "Compliance Dashboard" + "Last updated: 2 mins ago" + "Download Audit Report" button.
> - **Stats Row (4 KPI Cards):**
>   - KPI 1: "Pending PEP Checks" → 3 (Red).
>   - KPI 2: "Suspicious Flags" → 2 (Amber).
>   - KPI 3: "Deferred Verifications" → 15 (Blue).
>   - KPI 4: "Total Escalated" → 20 (Gray).
> - **Filter Bar:**
>   - Dropdown: "All Statuses" | "PEP Blocked" | "Suspicious" | "API Timeout".
>   - Search: Text input (placeholder: "Search by PAN, Name, or Account ID").
>   - Date Range Picker (from → to).
> - **Queue Table (Full Width, Scrollable):**
>   - **Columns:**
>     1. **User** (Name + PAN masked: `XXXX-1234`).
>     2. **Business Type** (Proprietorship / Partnership / Company).
>     3. **Risk Score** (Badge: Low/Medium/High).
>     4. **Flag Reason** (Text: "PEP Match", "Deepfake Score 68%", "MCA Timeout").
>     5. **Timestamp** (Relative: "2 mins ago").
>     6. **Action** (Buttons).
>   - **Action Buttons:**
>     - **"View Details"** (Blue outline, `text-sm`).
>     - **"Override & Force Accept"** (Red solid, `text-sm`). *Only visible for PEP/Suspicious flags.*
>     - **"Reject"** (Gray outline, `text-sm`).
> - **Modal on "Override" Click:**
>   - **Title:** "⚠️ Manual Override Confirmation".
>   - **Content:** "You are about to override AI decision for [User Name]. Risk Score: High (85%). Are you sure?"
>   - **Reason Input:** Textarea (placeholder: "Enter override reason for audit log...").
>   - **Two-Step Auth:** OTP input (6 digits, sent to admin's registered mobile).
>   - **Buttons:** "Cancel" (Gray) | "Confirm Override" (Red, `primary.sbi_red`).
>   - **API Call:** `POST /api/admin/override` with `{ userId, reason, otp }`.
>
> **Edge Cases:**
> - **Case 1 - OTP Failure:** Show error toast: "Invalid OTP. Please try again." Keep modal open.
> - **Case 2 - Network Error:** Show "Network error. Please retry." with Retry button.
> - **Case 3 - Success:** Show success toast: "✅ Override successful. User [Name] has been moved to Account Creation." Remove row from queue instantly.
> - **Case 4 - Already Processed:** If another admin overrides simultaneously, show: "This user has already been processed." Refresh table.
>
> **Real-Time Updates:**
> - WebSocket connection to `ws://api/ws/admin/queue`.
> - New flagged entries appear at the top of the table with a "New" pill (pulsing).
> - Auto-refresh every 30 seconds (or on new event).
>
> **Micro-interactions:**
> - **Row Hover:** Background changes to `gray-50`, shadow.
> - **"Override" Button:** Hover → scale(1.05), shadow-lg.
> - **Modal Open:** Backdrop blur (`backdrop-filter: blur(4px)`), slide-up animation.
> - **OTP Input:** Auto-focus next field on digit entry. Auto-submit on 6 digits.
>
> ---
>
> #### **Page 4: Audit Logs (RBI Compliance - Read-Only)**
> **Purpose:** Immutable, searchable audit trail for all agent actions.
>
> **Layout Structure (AdminLayout):**
> - **Top Bar:** "Audit Trail" (`Heading/LG`) + "7-Year Retention" badge (green pill).
> - **Advanced Filter Bar:**
>   - **User ID Search:** Text input (placeholder: "Enter User ID").
>   - **Agent Filter:** Dropdown (All Agents | Document | Registry | KYC | Risk | Product).
>   - **Date Range:** Start Date → End Date (React DatePicker).
>   - **Action Type:** Dropdown (All | Verification | Consent | Account Creation | Override).
>   - **"Search"** button (Blue, `primary.sbi_blue`).
>   - **"Export CSV"** button (Gray outline, `text-sm`).
> - **Logs Table (Virtualized for performance):**
>   - **Columns:**
>     1. **Timestamp** (ISO Format: `2026-07-02T14:32:10Z`).
>     2. **User ID** (Masked: `usr_****1234`).
>     3. **Agent Name** (Badge: DocAgent, RegistryAgent, etc.).
>     4. **Action** (Text: "PAN Verified", "MCA Timeout", "Override Triggered").
>     5. **Confidence Score** (Progress bar: 0-100%).
>     6. **Input Summary** (Redacted: `{"pan":"XXXX","gst":"XXXX"}` - click to expand).
>     7. **Status** (Green: Success, Amber: Warning, Red: Failed).
> - **Pagination:** Bottom: "Showing 1-50 of 12,345 logs" + Previous/Next buttons.
> - **Detail Expand:** Click row → Expand below showing **Full Agent Reasoning** (the LangSmith trace output).
>
> **Edge Cases:**
> - **Case 1 - No Results:** Show: "No logs found for this criteria. Adjust your filters." with an illustration.
> - **Case 2 - Export Large Data:** Show warning: "Exporting > 10,000 rows. This may take a few minutes." Generate CSV in background.
> - **Case 3 - Sensitive Data:** PAN/Aadhaar fields are redacted (first 4 chars only). Hover tooltip: "Data redacted for privacy."
>
> **API Integration:**
> - `GET /api/audit/logs?userId=xxx&agent=xxx&from=xxx&to=xxx&limit=50&offset=0`
> - `GET /api/audit/export?filters=xxx` (Download CSV).
>
> **Micro-interactions:**
> - **Search button:** Loading spinner while fetching.
> - **Expand row:** Smooth collapse/expand animation (max-height transition).
> - **Confidence Bar:** Color changes based on score (Green > 80, Amber 50-80, Red < 50).
>
> ---
>
> #### **Page 5: Manual Review / Blocked Screen (Customer View)**
> **Purpose:** What the customer sees when their flow is PEP blocked or paused.
>
> **Layout Structure (PublicLayout but branded):**
> - **Center Hero:**
>   - Icon: Large Shield (Red, 64px).
>   - Heading: "Application Under Review" (`Heading/LG`).
>   - Subtext: "Your application requires special approval. Our Relationship Manager will call you within 1 hour." (`Body/LG`, `#6B7280`).
>   - **Support Box:**
>     - Icon: Phone.
>     - Text: "Prefer to call? Contact SBI helpline: **1800-123-4567**" (`Body/MD`).
>     - Button: "📞 Call Helpline" (Outline Blue).
>   - **Return Button:** "← Back to YONO Home" (Gray text link).
>
> ---
>
> ### 🧩 REUSABLE COMPONENT LIBRARY (Atomic Design)
>
> **Atoms:**
> - **Button:** `variant="primary" | "secondary" | "danger" | "outline"`, `size="sm" | "md" | "lg"`, `loading`, `disabled`.
> - **Badge:** `variant="success" | "warning" | "error" | "info" | "default"`.
> - **Input:** `type="text" | "search" | "password" | "otp"`, `label`, `error`, `helperText`.
> - **Card:** `variant="default" | "elevated" | "outlined"`, `padding="md" | "lg"`.
> - **Spinner:** `size="sm" | "md" | "lg"`, `color="blue" | "white"`.
> - **Modal:** `title`, `description`, `onClose`, `size="sm" | "md" | "lg" | "xl"`.
> - **Toast:** `type="success" | "error" | "warning" | "info"`, `duration="5000"`.
>
> **Molecules:**
> - **Sidebar Nav Item:** `icon`, `label`, `path`, `active`, `badgeCount`.
> - **Metric Card:** `label`, `value`, `trend` (up/down), `icon`.
> - **Product Card:** `icon`, `title`, `description`, `badge`, `onApply`.
> - **Transaction Row:** `date`, `description`, `amount`, `status`.
> - **Filter Bar:** `searchInput`, `dropdowns`, `datePicker`, `onSearch`.
>
> **Organisms:**
> - **Data Table:** `columns`, `data`, `loading`, `pagination`, `onRowClick`.
> - **Admin Queue Table:** Extends Data Table with `overrideAction`, `viewAction`.
> - **Audit Log Table:** Extends Data Table with `expandableRow` (shows reasoning).
> - **Dashboard Grid:** Combines Metrics, Charts, Recent Transactions.
>
> ---
>
> ### 🧪 TESTING PROMPT (LOOP INSTRUCTION)
>
> **🔁 Self-Healing Loop Instructions:**
>
> **Step 1:** Write a Playwright test suite `tests/admin_hardness.spec.ts` that tests:
> - **Test 1:** Admin Queue renders PEP blocked user. Check: User appears in table, "Override" button is visible.
> - **Test 2:** Click "Override" → Fill OTP (mock: "123456") → Submit. Check: Success toast appears, row disappears from table.
> - **Test 3:** Audit Logs page. Search for the overridden user ID. Check: An entry with `Action = "Override"` appears.
> - **Test 4:** Customer Dashboard (limited tier). Check: Amber banner "Verification pending..." appears.
> - **Test 5:** If API returns 403 on override, ensure UI shows "Unauthorized" popup and does NOT close modal.
>
> **Step 2:** Run the tests mentally.
> - If Test 2 fails (row doesn't disappear): Rewrite `AdminQueue.tsx` to filter the local state array after successful API response.
> - If Test 3 fails (audit missing): Rewrite `AuditLogs.tsx` to re-fetch data after override success.
> - If Test 4 fails (banner wrong color): Rewrite `CustomerDashboard.tsx` to check `user.tier === 'limited'` and render amber banner.
>
> **Step 3:** Iterate until all tests pass.
>
> **Step 4:** Final deliverable: Complete `/web` folder with:
> - All 5 pages (Landing, Dashboard, Admin Queue, Audit Logs, Manual Review).
> - 12+ reusable components (atoms/molecules/organisms).
> - React Router v6 configuration.
> - Redux Toolkit / Zustand store for state management.
> - WebSocket client for real-time updates.
> - Tailwind CSS configuration with SBI colors.
> - Playwright test suite with 100% pass rate.
> - Fully responsive (desktop-first, mobile-friendly).
> - WCAG AA compliant (high contrast, ARIA labels, keyboard navigation).
>
> ---
>
> ### 🎯 FINAL DELIVERABLE CHECKLIST
> - [ ] Landing Page with Hero, Features, Trust Section, Footer
> - [ ] Customer Dashboard with Metrics, Products, Transactions, Tier Banner
> - [ ] Admin Queue with Real-Time PEP table, Override Modal with OTP
> - [ ] Audit Logs with Advanced Filters, Search, Export, Expandable Rows
> - [ ] Manual Review / Blocked Screen for PEP hit customers
> - [ ] 12+ Reusable UI Components (Button, Card, Badge, Modal, Toast, etc.)
> - [ ] Private/Admin Layouts with Sidebar Navigation
> - [ ] WebSocket integration for real-time queue updates
> - [ ] Responsive Design (desktop, tablet, mobile)
> - [ ] WCAG AA Accessibility (ARIA, keyboard nav, color contrast)
> - [ ] Playwright test suite with edge-case coverage
> - [ ] Dark mode toggle (optional but recommended)
>
> ---
>
> **This prompt is now self-contained, hyper-detailed, and ready to be fed directly into Stitch AI to generate production-grade React + Tailwind web code.** 🚀

---

### How to Use This Prompt with Stitch AI / v0.dev:

1. **Copy the entire prompt above** into the AI UI generator's text input.
2. **Select output format:** "React + Tailwind CSS + TypeScript + React Router".
3. **The AI will generate:**
   - Complete page components with exact layouts.
   - Atomic component library.
   - State management setup (Zustand/Redux).
   - WebSocket integration.
   - Playwright test files.
4. **Review and iterate:** If a component doesn't match the spec, paste that specific page section back in with a fix request.

Aap ye prompt seedha Stitch AI mein daal dijiye — ye AI aapko ek **production-ready, pixel-perfect, edge-case-hardened web dashboard** generate kar dega within minutes! 🚀