const fs = require('fs');
const https = require('https');
const { url, majVersion, minVersion, codebase } = require('../../version.json');

var colors = require('colors');
var colors = require('colors/safe');

// Main
versionCheck();

// Version Checking
// Normal Link
function versionCheck() {
    https.get(url, (res) => {
        let body = "";
        res.on("data", (chunk) => {
            body += chunk;
        });
        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                if (json.name == undefined) {
                    useFallback();
                    return
                }
                console.log("\n--------".blue.bold + `\Home`.brightRed.bold + ` Uploader`.brightBlue.bold + " Helper".blue.bold)
                if (json.status === "LEGACY") {
                    var status = colors.yellow;
                } else if (json.status === "ABANDONED") {
                    var status = colors.brightRed;
                } else {
                    var status = colors.green;
                }
                console.log(`Checking status of ${json.name}`.cyan.bold + `\nProject status is `.cyan + status(`${json.status}`))
                if (json.status != "ABANDONED") {
                    console.log(`Currently maintained by: ${json.maintainers}`.cyan.italic)
                } else {
                    console.log(`Formerly maintained by: ${json.maintainers}`.yellow.italic)
                }
                if (json.majVersion > majVersion) {
                    console.log("! Major update available!\nDownload from ".red.bold + `${json.repo}`.cyan)
                } else if (json.minVersion > minVersion) {
                    console.log("! Minor update available!\nDownload from ".yellow.bold + `${json.repo}`.cyan)
                } else {
                    console.log("Your instance is up to date!".cyan)
                }
                console.log("--------\n".blue.bold)
            } catch {
                return
            }
        })
    }).on("error", (error) => {
        console.log("err on version check");
    })
}