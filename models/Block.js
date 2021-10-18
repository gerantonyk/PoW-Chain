const SHA256 = require('crypto-js/sha256');

class Block {
  constructor() {
    this.timestamp = Date.now();
    this.nonce = 0;
    this.transactions = [];
    this.prevHash =''
  }
  addTransaction(tx) {
    this.transactions.push(tx);
  }
  hash() {
    return SHA256(
      this.prevHash +""+
      this.timestamp + "" +
      this.nonce + "" +
      JSON.stringify(this.transactions)
    ).toString();
  }
  execute(prevHash) {
    this.prevHash = prevHash
    this.transactions.forEach(x => x.execute());
  }
}

module.exports = Block;
