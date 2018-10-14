'use strict';

const uuidv4 = require('uuid/v4');
const datagram = require('dgram');
const NodeRSA = require('node-rsa');

//var uuid = require('uuid');

class SUDP {
    constructor(privateKey, publicKey) {
        //this.id = NO NEED RIGHT NOW
        this.socket  = datagram.createSocket('udp4');

        this.socket.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            this.server.close();
        });

        this.socket.on('message', (msg, rinfo) => {
            console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        });

        this.socket.on('listening', () => {
            const address = this.socket.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });
        this.socketPort = 41234;
        this.destPort = 41235;
        this.destIP = 'localhost';
        this.packet = 1;
        this.uuid = uuidv4();

        // Set Keypairs
        this.keys = new NodeRSA({b: 512});
        //  If loaded from file:
        if (privateKey !== undefined && publicKey !== undefined) {
            this.keys.importKey(privateKey,'private');
            this.keys.importKey(publicKey,'public');
        }
        else { 
            // Generate Keypair: takes time...
            this.keys.generateKeyPair();
        }
        this.lock = true;
    }
    
    listen(port, callback) {
        this.socket.bind(port,() => {f 
            if (callvback !== undefined)
                callback();
        });
        
    }

    showKeys() {
        return this.keys.exportKey('public');
    }

    connect(ip,port) {
        let i = 0;
        while (this.lock) {
            
        }
        const container = this.generateGenesisBlock();
        this.destIP = ip;
        this.destPort = port;
        console.log(this.send(container));
    }

    send(msg) {
        let buffer = Buffer.from(JSON.stringify(msg)); // Converts to buffer
        // use when getting messages: let obj = JSON.parse(buffer.toString());
        this.socket.send(buffer, this.destPort, this.destIP, (err,bytes) => {
            if (err)
                return false;
            else
                return bytes;
        })
    }

    getUuid() {
        return this.uuid;
    }

    hash() {
        
    }

    generateGenesisBlock() {
        return {
            "packet" : this.packet,
            "uuid" : this.uuid,
            "publicKey" : this.keys.exportKey('public')
        }
    }
}

module.exports = SUDP;