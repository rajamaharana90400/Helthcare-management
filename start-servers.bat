@echo off
cd /d "c:\Users\RAJA\Downloads\healthflow-hub-main\healthflow-hub-main"
start cmd /k npm run dev
timeout /t 3
start cmd /k npm run api
