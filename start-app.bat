@echo off
echo Starting SmartSell Business Dashboard...
echo.

echo Starting Backend Server...
cd bizboard-backend
start "SmartSell Backend" cmd /k "npm start"

echo.
echo Starting Frontend Server...
cd ..\remote-sync-works-main\remote-sync-works-main
start "SmartSell Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:8080
echo.
echo Press any key to open SmartSell Dashboard...
pause >nul
start http://localhost:8080 