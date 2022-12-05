echo off
cls

echo [1] Start Server
echo [2] Stop Server
echo [3] Restart Server
echo [4] Delete Server
echo [5] Show Detail

CHOICE /C 123456 /n /T 15 /D 6 /M "(Exits after 15 second):"

echo %ERRORLEVEL%

if %ERRORLEVEL%==1 (goto StartServer)
if %ERRORLEVEL%==2 (goto StopServer)
if %ERRORLEVEL%==3 (goto RestartServer)
if %ERRORLEVEL%==4 (goto DeleteServer)
if %ERRORLEVEL%==5 (goto ShowDetail)
if %ERRORLEVEL%==6 (goto NoSelection)






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