@echo off
cd ../back
@echo =========================== Update Package.json : ===========================
call npm update


REM========================= Entrez vos variables ici =======================
set PORT=5000
set IDMDB=username:password
set TOKEN_SECRET=randomstringrandomstringrandomstring
REM========================= Entrez vos variables ici =======================


@echo =============================== Variables env : ==============================
set PORT
set IDMDB
set TOKEN_SECRET
TIMEOUT /T 5
cls
@echo ============================ Start back-end server ===========================
call npm start server
