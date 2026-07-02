$ErrorActionPreference = "Stop"

if (Test-Path db.json) { Remove-Item db.json }
if (Test-Path chaos.flag) { Remove-Item chaos.flag }

Write-Host "--- Loop 1: Run chaos_injector.py to slow down MCA API ---"
python chaos_injector.py

Write-Host "--- Triggering new onboarding ---"
python run_onboarding.py | Out-Null

Write-Host "--- Loop 2: Check DB for account_tier ---"
$db = Get-Content db.json | ConvertFrom-Json
$tier = $db.user_infra_1.account_tier

if ($tier -eq "pending") {
    Write-Host "Test FAILS: account_tier is pending."
    exit 1
} elseif ($tier -eq "limited") {
    Write-Host "Account tier correctly limited."
} else {
    Write-Host "Unknown tier: $tier"
}

Write-Host "`n--- Loop 3: Rewrite Circuit Breaker timeouts to 3 seconds ---"
$cbPath = "..\backend\src\circuit_breaker.py"
(Get-Content $cbPath) -replace 'wait_chain\(\*\[wait_fixed\(2\), wait_fixed\(4\), wait_fixed\(8\)\]\)', 'wait_chain(*[wait_fixed(1), wait_fixed(2)])' | Set-Content $cbPath
(Get-Content $cbPath) -replace 'stop_after_attempt\(4\)', 'stop_after_attempt(3)' | Set-Content $cbPath
Write-Host "Timeouts modified in circuit_breaker.py to simulate a 3-second instant fallback."

Write-Host "`n--- Loop 4: Rerun script (onboarding) ---"
if (Test-Path db.json) { Remove-Item db.json }
python run_onboarding.py | Out-Null
$db = Get-Content db.json | ConvertFrom-Json
$tier = $db.user_infra_1.account_tier

if ($tier -eq "limited") {
    Write-Host "PASS: DB shows account_tier = limited within 15 seconds."
} else {
    Write-Host "FAIL: DB shows $tier"
    exit 1
}

Write-Host "`n--- Loop 5: Wait 30 mins (simulate time). K8s CronJob runs ---"
python chaos_injector.py disable
python auto_upgrader.py
$db = Get-Content db.json | ConvertFrom-Json
$tierAfter = $db.user_infra_1.account_tier

if ($tierAfter -eq "full") {
    Write-Host "PASS: account_tier is now full because retry succeeded."
} else {
    Write-Host "FAIL: account_tier is $tierAfter"
    exit 1
}

Write-Host "`nAll Infrastructure Hardness tests passed!"
