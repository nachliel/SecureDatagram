'use strict';
const NodeRSA = require('node-rsa');
const keys = new NodeRSA({b: 512});
const fs = require('fs');
keys.generateKeyPair();
fs.writeFile('key-public.pem',keys.exportKey('public'),'utf8',(err) =>{
    if (err) {
        console.log('Error: ' + err);
    }
    else {
        console.log('Public key written to file.');
        fs.readFile('key-public.pem','utf8',(err,data) => {
            if (err)
                console.log('Error: ' + err);
            else {
                console.log(data);
            }
        });
    }
        

});
fs.writeFile('key-private.pem',keys.exportKey('private'),'utf8',(err) =>{
    if (err) {
        console.log('Error: ' + err);
    }
    else {
        console.log('Public key written to file.');
        fs.readFile('key-private.pem','utf8',(err,data) => {
            if (err)
                console.log('Error: ' + err);
            else {
                console.log(data);
            }
        });
    }
        
});
