echo off
cls
set _date=%DATE% - %TIME%

SET Hide=0
Set LogFileName="HomeUpload_SilentRun_log.txt"
rem ---------- for Argument passing --------------
SET UserChoice=%1

if NOT "%UserChoice%" == "" (
    SET Hide=1
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
if %Hide%==1 ( 
    echo ::::::::::::: ---------------------------------------------------------------------------------------- ::::::::::::: >> %LogFileName%
    echo ::::::::::::: ------------------------------ %_date% ---------------------------------- ::::::::::::: >> %LogFileName%
    echo ::::::::::::: ---------------------------------------------------------------------------------------- ::::::::::::: >> %LogFileName%
    npm run StartServer >> %LogFileName%
)else cmd /k npm run StartServer
goto finally

:StopServer
if %Hide%==1 ( 
    echo ::::::::::::: ---------------------------------------------------------------------------------------- ::::::::::::: >> %LogFileName%
    echo ::::::::::::: ------------------------------ %_date% ---------------------------------- ::::::::::::: >> %LogFileName%
    echo ::::::::::::: ---------------------------------------------------------------------------------------- ::::::::::::: >> %LogFileName%
    npm run StopServer >> %LogFileName%
)else cmd /k npm run StopServer
goto finally

:RestartServer
if %Hide%==1 ( 
    echo ::::::::::::: ---------------------------------------------------------------------------------------- ::::::::::::: >> %LogFileName%
    echo ::::::::::::: ---------------------------------------------------------------------------------------- ::::::::::::: >> %LogFileName%echo ::::::::::::: ------------------------------ %_date% ---------------------------------- ::::::::::::: >> %LogFileName%
    echo ::::::::::::: ---------------------------------------------------------------------------------------- ::::::::::::: >> %LogFileName%
    npm run RestartServer >> %LogFileName%
)else cmd /k npm run RestartServer
goto finally

:DeleteServer
if %Hide%==1 ( 
    echo ::::::::::::: ---------------------------------------------------------------------------------------- ::::::::::::: >> %LogFileName%
    echo ::::::::::::: ------------------------------ %_date% ---------------------------------- ::::::::::::: >> %LogFileName%
    echo ::::::::::::: ---------------------------------------------------------------------------------------- ::::::::::::: >> %LogFileName%
    npm run DeleteServer >> %LogFileName%
)else cmd /k npm run DeleteServer

goto finally

:ShowDetail
if %Hide%==1 ( 
    echo ::::::::::::: ---------------------------------------------------------------------------------------- ::::::::::::: >> %LogFileName%
    echo ::::::::::::: ------------------------------ %_date% ---------------------------------- ::::::::::::: >> %LogFileName%
    echo ::::::::::::: ---------------------------------------------------------------------------------------- ::::::::::::: >> %LogFileName%
    npm run info >> %LogFileName%
)else cmd /k npm run info

goto finally

:NoSelection
echo No Choice were selected. bye!

:finally
if %Hide%==0 pause
exit