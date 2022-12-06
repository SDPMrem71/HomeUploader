# About

Filing Saucer is a file sharing server accessed through a web GUI.

----

## Automatic Installation

Not available But after manual installation There are 2 script available for production use.

* `RunHomeUploader.sh`
* `RunHomeUploader.bat`

`RunHomeUploader.bat` Is able to run with argument to start,stop and etc or normaly.

----

## Manual Installation (macOS/Linux/Windows)

### Clone Codebase

Clone the main branch

    git clone https://github.com/SDPMrem71/HomeUploader

Change into the cloned directory and run the following command:

    npm install

### Configure

Run the following command from within the project directory to configure:

    node HomeUploader.js -c

### Run

The entry point for codebases is `HomeUploader.js`

    node HomeUploader.js
    or
    npm run test

It is highly recommended that you run with [PM2 by Keymetrics], a node process manager which is available with.

    npm run StartServer

----