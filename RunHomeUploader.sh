#!/bin/bash
# This script clears the terminal, displays options to use server.
clear

echo [1] Start Server
echo [2] Stop Server
echo [3] Restart Server
echo [4] Delete Server
echo [5] Show Detail

read -n 1 -t 15 -p "Exits after 15 second:" choice


     case $choice in
         1)
             npm run StartServer
             ;;
         2)
             npm run StopServer
             ;;
         3)
             npm run RestartServer
             ;;
         4)
             npm run DeleteServer
             ;;
         5)
             npm run info
             ;;
         *)
             echo No Choice were selected. bye!
             ;;
     esac

read -n 1 -p "Press any key to exit ..."
exit