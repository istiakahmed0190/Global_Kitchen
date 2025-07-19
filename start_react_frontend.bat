@echo off
echo Starting GlobalKitchen React Frontend
echo "Cooking Without Borders where Flavors Meet Cultures"
echo.

cd /d "D:\(H) Study\programming\3100 project\project_recipe_website\global_kitchen\globalKitchen\v0 all\v0 react django"

echo Installing dependencies (if needed)...
npm install --legacy-peer-deps

echo.
echo Starting React development server...
echo Frontend will be available at: http://localhost:3000
echo.

npm run dev

pause
