### Prompt 4: Web Frontend (Admin Override + Audit Logs)
**Copy this into Antigravity:**

> **Role:** Senior Web Engineer (React, Tailwind, Recharts).
> **Project:** "Vyapaar Mitra" — SBI Admin & Dashboard Panel.
> **Goal:** Build a real-time admin dashboard to handle PEP blocks and manual overrides, plus a read-only audit log for RBI.
> 
> **Absolute Requirements (No Compromises):**
> 1. **Routes**: `/` (Landing), `/dashboard` (Customer view), `/admin/queue` (Blocked cases), `/audit/logs` (Read-only).
> 2. **Admin Queue (Edge Case)**: Show a table of users where `state = "blocked_pep"` or `suspicious_flag = true`. Include columns: Name, PAN (masked), Risk Score, Agent Reason. Add a red "Override & Force Accept" button.
> 3. **Dashboard Tier Banner**: For customers with `account_tier = "limited"`, show a persistent amber banner: "Verification Pending. We will upgrade you in 24hrs."
> 4. **Audit Log Viewer**: Build a searchable table fetching logs from Elasticsearch (mock API). Show `timestamp`, `Agent_Action`, `Confidence_Score`, `Input_Payload` (redacted). Must be filterable by `user_id`.
> 
> **🔁 Looping Instruction (Self-Healing):**
> - Write a Playwright test file `test_admin_hardness.spec.js`.
> - **Loop 1:** Mock the API returning a "PEP blocked" user. Ensure the user appears in the Admin Queue table.
> - **Loop 2:** Click the "Override & Force Accept" button. The test must call `POST /api/admin/override`. If the API returns 403 (Forbidden), rewrite the frontend to handle it and show an "Unauthorized" popup.
> - **Loop 3:** The test must check that after override, the user disappears from the queue and the Audit log shows an `admin_override` entry.
> - **Final Deliverable:** The `/web` folder, `AdminQueue.jsx`, `AuditLog.jsx`, and the passing Playwright test.
