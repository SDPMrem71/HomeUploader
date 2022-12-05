'use strict'

global.__basedir = __dirname;
global.__scriptsDir = __dirname + '/scripts';
global.__registryDir = __dirname + '/content/registry';
global.__uploadsDir = __dirname + '/content/uploads';

require('dotenv').config({ path: "./.env" })
if (process.env.aerialhelper === "true" || process.env.aerialhelper === true) {
  require("./scripts/aeriallaptop/aerialhelper");
}

var fs = require('fs');
var https = require('https');
var colors = require('colors');
const express = require("express");
const app = express();
var httpsoptions;
const cookieParser = require('cookie-parser');

var CertConfig = require('./CreateCertificate');
let crt = new CertConfig();
crt.Create(process.env.host, "HomeUploader", process.env.USER || process.env.USERNAME);


if (process.env.protocol == 'https') {
  httpsoptions = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/crt.pem')
  }
}

// CLI constants
const optionDefinitions = [
  { name: 'configure', alias: 'c', type: Boolean }
]
const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)
const cliArgs = JSON.stringify(options);
const cliArgsParsed = JSON.parse(cliArgs);

// CLI arg handling
if (cliArgsParsed.configure) {
  require("./scripts/appUtil/configure");
}

// Exit if there is no configuration
if (process.env.port == undefined) {
  console.log("X ".brightRed.bold + ".env does not exist! Please run with the ".red + "--configure".brightRed.bgGray + " flag to generate it!".red);
  process.exit()
}

// Set URL
console.log();
const url = `${process.env.protocol}://${process.env.host}`
const port = `${process.env.port}`

const forcePortRm = `${process.env.forcePortRemovalInApp}`
global.urlFull = url
if (forcePortRm == "true") {
  global.urlFull = `${url}/`
  console.log("URL is set to ".blue + urlFull + "\nPort removal is FORCED per your configuration.".yellow)
} else {
  global.urlFull = `${url}:${port}/`
  console.log("URL is set to ".blue + urlFull + "\nTo force port removal, please edit your configuration.".blue)
}


// Require controller and routing
const uploadRoute = require(`${__scriptsDir}/routing/upload`);
const initRoutes = require("./scripts/routing");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Create static route for home page, assets, etc.
app.use(express.static('content/static'));
initRoutes(app);
app.set('view engine', 'ejs');
app.post('/uploadfile', uploadRoute.upload);



if (process.env.protocol == 'https') {
  const sslserver = https.createServer(httpsoptions, app);

  sslserver.listen(process.env.port, () => {
    console.log(`FilingSaucer started successfully on port ${process.env.port}!`.green.bold);
    console.log(`To change configuration options, please run application with --configure (-c)`.green.italic);
  });
} else {
  // Open app.
  app.listen(process.env.port, () => {
    console.log(`FilingSaucer started successfully on port ${process.env.port}!`.green.bold);
    console.log(`To change configuration options, please run application with --configure (-c)`.green.italic);
  });
}