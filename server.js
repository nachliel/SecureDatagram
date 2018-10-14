'use strict';

// Load key pair:
const fs = require('fs');

const SecureUDP = require('./conducter');

console.log('Creating new server.');

const sudpServer = new SecureUDP();
sudpServer.listen(41235);



