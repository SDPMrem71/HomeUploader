'use strict'
let fs = require('fs');
let https = require('https');
let colors = require('colors');
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
let CertConfig = require('./CreateCertificate');
let httpsoptions;

//setup envirement variable
require('dotenv').config({ path: "./.env" })

//setup application directories
require(`./scripts/appUtil/setupHomeUploader`);

global.__basedir = __dirname;
global.__scriptsDir = __dirname + '/scripts';
global.__registryDir = __dirname + '/content/registry';
global.__uploadsDir = __dirname + '/content/uploads';


if (process.env.versionCheck === "true" || process.env.versionCheck === true) {
  require("./scripts/appUtil/onlineVersionCheck");
}

//setup ssl
if (process.env.protocol == 'https') {
  let crt = new CertConfig();
  crt.Create(process.env.host, "HomeUploader", process.env.USER || process.env.USERNAME);

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

global.urlFull = `${url}:${port}/`
console.log("URL is set to ".blue + urlFull);

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


//open app for https or http
if (process.env.protocol == 'https') {
  const sslserver = https.createServer(httpsoptions, app);

  sslserver.listen(process.env.port, () => {
    console.log(`Started successfully on port ${process.env.port}!`.green.bold);
    console.log(`To change configuration options, please run application with --configure (-c)`.green.italic);
  });
} else {
  app.listen(process.env.port, () => {
    console.log(`Started successfully on port ${process.env.port}!`.green.bold);
    console.log(`To change configuration options, please run application with --configure (-c)`.green.italic);
  });
}