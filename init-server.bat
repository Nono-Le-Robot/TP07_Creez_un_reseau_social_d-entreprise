@echo off
cd back
@echo ============================= Install back-end server Packages ============================
call npm install
@echo ========================================== SUCCESS ========================================
cd ../
cd front
@echo ============================= Install front-end server Packages ===========================
call npm install
@echo ======================================== Install Vue ======================================
call npm i vue
@echo ===========================================================================================
@echo =========================================  SUCCESS  =======================================
@echo ===========================================================================================
PAUSE