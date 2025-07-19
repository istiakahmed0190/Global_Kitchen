@echo off
echo ========================================
echo   GlobalKitchen Django Backend Server
echo   "Cooking Without Borders where Flavors Meet Cultures"
echo ========================================
echo.

cd /d "D:\(H) Study\programming\3100 project\project_recipe_website\global_kitchen\globalKitchen\global_kitchen\backend"

echo Step 1: Installing Django dependencies...
pip install -r requirements.txt

echo.
echo Step 2: Running migrations...
python manage.py makemigrations
python manage.py migrate

echo.
echo Step 3: Starting Django development server...
echo Server will be available at: http://127.0.0.1:8000
echo.

python manage.py runserver

pause
