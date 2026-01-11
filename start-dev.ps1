#!/usr/bin/env pwsh
# Start MediCare Development Servers

Write-Host "Starting MediCare Application..." -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Get the current script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $scriptPath

Write-Host "Working directory: $(Get-Location)" -ForegroundColor Cyan

# Kill any existing node processes
Write-Host "Stopping any existing Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1

# Start API Server in background
Write-Host "Starting API Server..." -ForegroundColor Cyan
Start-Job -ScriptBlock {
    Set-Location "$($args[0])"
    npm run api
} -ArgumentList $scriptPath

Start-Sleep -Seconds 3

# Start Frontend Dev Server
Write-Host "Starting Frontend Dev Server..." -ForegroundColor Cyan
npm run dev

Pop-Location
