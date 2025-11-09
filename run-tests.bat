--wasted so much time trying to create like a fancy scprit that run everything so that i just run everything in one command 


@echo off
echo Starting Backend API...
start "" cmd /k "cd backend\FalloutBunkerManager && dotnet run"

timeout /t 5 /nobreak >nul

echo Starting Frontend Expo...
start "" cmd /k "cd frontend && npx expo start"

timeout /t 10 /nobreak >nul

echo Running Playwright UI Tests...
cd Tests
npx playwright test UI\deviceValues.spec.ts
pause

