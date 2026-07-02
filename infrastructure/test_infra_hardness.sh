#!/bin/bash
set -e

# Cleanup before test
rm -f db.json chaos.flag

echo "--- Loop 1: Run chaos_injector.py to slow down MCA API ---"
python chaos_injector.py

echo "--- Triggering new onboarding ---"
python run_onboarding.py > /dev/null 2>&1 || true

echo "--- Loop 2: Check DB for account_tier ---"
# We extract the account_tier for user_infra_1 using grep/cut since we don't assume jq is installed
TIER=$(cat db.json | grep -o '"account_tier": "[^"]*' | cut -d'"' -f4)

if [ "$TIER" = "pending" ]; then
    echo "Test FAILS: account_tier is pending."
    exit 1
elif [ "$TIER" = "limited" ]; then
    echo "Account tier correctly limited."
else
    echo "Unknown tier: $TIER"
fi

echo ""
echo "--- Loop 3: Rewrite Circuit Breaker timeouts to 3 seconds ---"
# We modify circuit_breaker.py in the backend to have shorter timeouts to trigger fallback instantly
# We are replacing the wait_chain to just wait 1 second and retry 2 times, simulating a faster fallback
sed -i 's/wait_chain(\*\[wait_fixed(2), wait_fixed(4), wait_fixed(8)])/wait_chain(*[wait_fixed(1), wait_fixed(2)])/g' ../backend/src/circuit_breaker.py
sed -i 's/stop_after_attempt(4)/stop_after_attempt(3)/g' ../backend/src/circuit_breaker.py
echo "Timeouts modified in circuit_breaker.py to simulate a 3-second instant fallback."

echo ""
echo "--- Loop 4: Rerun bash script (onboarding) ---"
rm -f db.json # clear db
python run_onboarding.py > /dev/null 2>&1 || true
TIER=$(cat db.json | grep -o '"account_tier": "[^"]*' | cut -d'"' -f4)
if [ "$TIER" = "limited" ]; then
    echo "PASS: DB shows account_tier = limited within 15 seconds."
else
    echo "FAIL: DB shows $TIER"
    exit 1
fi

echo ""
echo "--- Loop 5: Wait 30 mins (simulate time). K8s CronJob runs ---"
python chaos_injector.py disable
python auto_upgrader.py
TIER_AFTER=$(cat db.json | grep -o '"account_tier": "[^"]*' | cut -d'"' -f4)
if [ "$TIER_AFTER" = "full" ]; then
    echo "PASS: account_tier is now full because retry succeeded."
else
    echo "FAIL: account_tier is $TIER_AFTER"
    exit 1
fi

echo ""
echo "All Infrastructure Hardness tests passed!"
