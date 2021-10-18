const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const ec = new EC('secp256k1');

function verify(publicKey,amount,signature) {
  key = ec.keyFromPublic(publicKey,'hex')
  const msgHash = SHA256('amount1234'+ amount).toString()
  try {
    console.log(key.verify(msgHash, signature))
    return key.verify(msgHash, signature)
  } catch(e) {
    return false
  }
}
// const signature = '304502204a3c6d6594d43a8df5cbd30c5ebc69ecc674ed371db8e25ccf44e7e2dbd16fe8022100db3b6390304c3501f8cd8927774843c4692250bf065aa3c99f23deaea1b69462'
// const publicKey = '049a1bad614bcd85b5f5c36703ebe94adbfef7af163b39a9dd3ddbc4f286820031dfcb3cd9b3d2fcbaec56ff95b0178b75d042968462fbfe3d604e02357125ded5'
// const amount = 25
// verify(publicKey,amount,signature)
module.exports = {verify}