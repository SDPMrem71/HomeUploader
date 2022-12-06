var fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });
var colors = require('colors');
var colors = require('colors/safe');


console.log("Entered Setup".cyan.bold);
var protocol = prompt("==> (http||https)".gray.bold + " Protocol: ".blue);
var port = prompt("==> (8080)".gray.bold + " Port: ".blue);
var host = prompt("==> (localhost || 127.0.0.1 || 192.168.1.10)".gray.bold + " Host: ".blue);
var accessLimit = prompt("==> (40)".gray.bold + " Access Limit (/share, /view, /download PER 5 MINUTES): ".blue);
var apiLimit = prompt("==> (10)".gray.bold + " API Limit (/delete, /upload PER 15 MINUTES): ".blue);
var maxSize = prompt("==> (8)".gray.bold + " Maximum file size in MB: ".blue);
var applicationName = prompt("==> (HomeUploader)".gray.bold + " Application Name: ".blue);
var organizationName = prompt("==> (Home Inc)".gray.bold + " Organization Name: ".blue);
var versionCheck = prompt("==> (false)".gray.bold + " Enable versionCheck: ".blue);
if (protocol == "") { protocol = 'http'; }
if (port == "") { port = 8080; }
if (host == "") { host = `localhost`; }
if (forcePortRemovalInApp == "") { forcePortRemovalInApp = false; }
if (accessLimit == "") { accessLimit = 40; }
if (apiLimit == "") { apiLimit = 10; }
if (maxSize == "") { maxSize = true; }
if (applicationName == "") { applicationName = "HomeUploader"; }
if (organizationName == "") { organizationName = "Home Inc"; }
if (versionCheck == "") { versionCheck = false; }

var formatted = `protocol=${protocol}
port=${port}
host=${host}
accessLimit=${accessLimit}
apiLimit=${apiLimit}
maxSize=${maxSize}
applicationName=${applicationName}
organizationName=${organizationName}
versionCheck=${versionCheck}`
var createStream = fs.createWriteStream(`./.env`);
createStream.end();
fs.writeFileSync(`./.env`, formatted);
console.log("> ".green.bold + "Successfully created the configuration file: ".cyan + "./.env".blue);
console.log("> ".green.bold + `Home Uploader has successfully been configured with the following options:\n${formatted}\n\n` + "> ".green.bold + `Home Uploader will now exit. Please start without the --configure option to proceed to the application.`.cyan);
console.log("> ".green.bold + "You may consider regenerating some files to update the Application Name and Organization Name. You may do that by running the --regen option.".cyan.italic);
process.exit()