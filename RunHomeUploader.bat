echo off
cls

rem ---------- for Argument passing --------------
SET UserChoice=%1

if NOT "%UserChoice%" == "" (
    goto Selection
    )
rem ---------------------------------------------

echo [1] Start Server
echo [2] Stop Server
echo [3] Restart Server
echo [4] Delete Server
echo [5] Show Detail

CHOICE /C 123456 /n /T 15 /D 6 /M "(Exits after 15 second):"

SET UserChoice=%ERRORLEVEL%

rem echo %ERRORLEVEL%

:Selection
if %UserChoice%==1 (goto StartServer)
if %UserChoice%==2 (goto StopServer)
if %UserChoice%==3 (goto RestartServer)
if %UserChoice%==4 (goto DeleteServer)
if %UserChoice%==5 (goto ShowDetail)
if %UserChoice%==6 (goto NoSelection)



:StartServer
cmd /k npm run StartServer

goto finally

:StopServer
cmd /k npm run StopServer

goto finally

:RestartServer
cmd /k npm run RestartServer

goto finally

:DeleteServer
cmd /k npm run DeleteServer

goto finally

:ShowDetail
cmd /k npm run info

goto finally

:NoSelection
echo No Choice were selected. bye!

:finally
pause
exit