'use strict';

// Load key pair:
const fs = require('fs');

const SecureUDP = require('./conducter');

console.log('Creating new server.');

let read = 0;
let privateKey;
let publicKey;
fs.readFile('key-private.pem',(err,data) => {
    privateKey = data;
    read++;
    starter();
});
fs.readFile('key-public.pem',(err,data) => {
    publicKey = data;
    read++;
    starter();
});

function starter() {
    if (read == 2) {
        main();
    }
}

function main() {
    const sudpServer = new SecureUDP(privateKey,publicKey);
    sudpServer.listen(41234, () => {
        sudpServer.connect('localhost',41235);
    });
}

