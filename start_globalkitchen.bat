@echo off
echo ========================================
echo    GlobalKitchen Full Stack Launcher
echo    "Cooking Without Borders where Flavors Meet Cultures"
echo ========================================
echo.
echo Choose what to start:
echo 1. React Frontend only (localhost:3000)
echo 2. Django Backend only (localhost:8000)
echo 3. Both Frontend and Backend
echo 4. Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto frontend
if "%choice%"=="2" goto backend
if "%choice%"=="3" goto both
if "%choice%"=="4" goto exit
echo Invalid choice, please try again.
pause
goto start

:frontend
echo Starting React Frontend...
start "" "start_react_frontend.bat"
goto end

:backend
echo Starting Django Backend...
start "" "start_django_server.bat"
goto end

:both
echo Starting both Frontend and Backend...
start "" "start_react_frontend.bat"
timeout /t 3 /nobreak >nul
start "" "start_django_server.bat"
goto end

:exit
echo Goodbye!
goto end

:end
echo.
echo Services started! Check the opened windows.
pause
