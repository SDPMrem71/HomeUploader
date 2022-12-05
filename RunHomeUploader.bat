echo off
cls

echo [1] Start Server
echo [2] Stop Server
echo [3] Restart Server
echo [4] Delete Server
echo [5] Show Detail

CHOICE /C 123456 /n /T 40 /D 6 /M "(Exits after 40 second):"

echo %ERRORLEVEL%

if %ERRORLEVEL%==1 (goto StartServer)
if %ERRORLEVEL%==2 (goto StopServer)
if %ERRORLEVEL%==3 (goto RestartServer)
if %ERRORLEVEL%==4 (goto DeleteServer)
if %ERRORLEVEL%==5 (goto ShowDetail)
if %ERRORLEVEL%==6 (goto exit)



:finally
pause
exit


:StartServer
npm run StartServer

goto finally

:StopServer
npm run StopServer

goto finally

:RestartServer
npm run RestartServer

goto finally

:DeleteServer
npm run DeleteServer

goto finally

:ShowDetail
npm run info

goto finally

:exit
echo No Choice were selected. bye!

goto finally