@echo off
cd ../front
@echo =========================== Update Package.json : ===========================
call npm update
@echo ========================== Start front-end server ===========================
call npm run serve