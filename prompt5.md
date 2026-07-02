### Prompt 5: DevOps & Infrastructure (Self-Healing Chaos Monkey)

> **Role:** Senior DevOps Engineer (Kubernetes, Terraform, Python).
> **Project:** "Vyapaar Mitra" — Infrastructure & Resilience Testing.
> **Goal:** Set up the cloud stack and write a "Chaos Monkey" script that intentionally breaks APIs to test the Circuit Breaker.
> 
> **Absolute Requirements (No Compromises):**
> 1. **Infra as Code**: Write Terraform for AWS EKS, RDS (Postgres), ElastiCache (Redis), MSK (Kafka), and S3.
> 2. **Self-Healing CronJob**: Write a Python script (`auto_upgrader.py`) that runs every 30 mins via K8s CronJob. It queries the DB for `verification_pending = True` and `created_at < NOW() - 1 hour`. It retries the MCA API and updates `account_tier = "full"` if successful. If fails, increments a retry counter.
> 3. **Chaos Monkey (Demo Ready)**: Write `chaos_injector.py`. This script runs in the test environment. It intercepts traffic to the mock MCA API and injects a 10-second delay for 50% of the requests.
> 4. **Observability**: Deploy Prometheus + Grafana. Provide a dashboard JSON showing metrics: `circuit_breaker_trips_total`, `retry_attempts`, `onboarding_duration_seconds`.
> 
> **🔁 Looping Instruction (Self-Healing):**
> - Write a `test_infra_hardness.sh` (bash script).
> - **Loop 1:** Run `chaos_injector.py` to slow down the MCA API. Trigger a new onboarding.
> - **Loop 2:** The bash script checks the DB. If `account_tier` is still "pending" after 1 minute, the test FAILS.
> - **Loop 3:** Rewrite the Circuit Breaker timeouts in the backend to 3 seconds, triggering fallback instantly.
> - **Loop 4:** Rerun the bash script. The DB should show `account_tier = "limited"` within 15 seconds. PASS.
> - **Loop 5:** Wait 30 mins (simulate time). The K8s CronJob runs. The script checks DB again; `account_tier` should now be "full" because the retry succeeded.
> - **Final Deliverable:** The `infrastructure/` folder, `chaos_injector.py`, `auto_upgrader.py`, and the `test_infra_hardness.sh` bash script.
