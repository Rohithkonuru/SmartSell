Write-Host "Starting SmartSell Business Dashboard..." -ForegroundColor Green
Write-Host ""

# Start Backend Server
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Set-Location "bizboard-backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start" -WindowStyle Normal

# Start Frontend Server
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Set-Location "..\remote-sync-works-main\remote-sync-works-main"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Backend will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend will be available at: http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to open SmartSell Dashboard..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Start-Process "http://localhost:8080" 