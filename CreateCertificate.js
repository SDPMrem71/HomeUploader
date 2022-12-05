'use strict'
var fs = require('fs');
var path = require('path');
var selfsigned = require('selfsigned');

class CertConfig {
    #basePath = path.join(__dirname, "cert");
    #crtPath = path.join(__dirname, "cert", "crt.pem");
    #keyPath = path.join(__dirname, "cert", "key.pem");
    #publicPath = path.join(__dirname, "cert", "public.pem");

    constructor() {
    }
    /**
     * check to create or not and create
     * @param {string} host 
     * @param {string} siteName 
     * @param {string} Admin Name
     * @returns true or false
     */
    Create(host, siteName, Admin) {

        if (fs.existsSync(this.#crtPath) && fs.existsSync(this.#keyPath)) {
            return;
        } else {
            this.#removeAllFile();

            var attrs = [
                { name: 'commonName', value: host },
                { name: 'organizationName', value: siteName },//Public knowledge
                { name: 'emailAddress', value: `${Admin}@gmail.com` },
                { name: 'localityName', value: 'Moon' }
            ];

            var pems = selfsigned.generate(attrs, {
                keySize: 2048, // the size for the private key in bits (default: 1024)
                days: 365, // how long till expiry of the signed certificate (default: 365)
                algorithm: 'sha256', // sign the certificate with specified algorithm (default: 'sha1')
                extensions: [{ name: 'basicConstraints', cA: true }], // certificate extensions array
                pkcs7: true, // include PKCS#7 as part of the output (default: false)
                clientCertificate: true // generate client cert signed by the original key (default: false)
                , clientCertificateCN: Admin // client certificate's common name (default: 'John Doe jdoe123')
            });
            fs.writeFileSync(this.#keyPath, pems.private, {
                encoding: 'utf-8',
                flag: 'w'
            })
            fs.writeFileSync(this.#crtPath, pems.cert, {
                encoding: 'utf-8',
                flag: 'w'
            })
            fs.writeFileSync(this.#publicPath, pems.public, {
                encoding: 'utf-8',
                flag: 'w'
            })

        }
    }

    #removeAllFile() {
        var files = fs.readdirSync(this.#basePath);
        for (const file of files) {
            fs.unlink(path.join(this.#basePath, file), (err) => {
                if (err) throw err;
            });
        }
    }
}

module.exports = CertConfig;
//"C:\Program Files\Git\usr\bin\openssl.exe" req - x509 - newkey rsa: 4096 - sha256 - days 3650 - nodes - keyout.\cert\key1.pem - out.\cert\crt1.pem - subj "/CN=localhost"
