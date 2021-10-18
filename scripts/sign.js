const {argv} = require('yargs');
const {privateKey,amount} = argv;
const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const ec = new EC('secp256k1');


let key = ec.keyFromPrivate(privateKey)
const msgHash = SHA256('amount1234'+ amount).toString()
let signature = key.sign(msgHash.toString());
console.log(signature.toDER('hex'));
