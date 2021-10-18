const jayson = require('jayson');
const {startMining, stopMining} = require('./mine');
const {PORT} = require('./config');
const {utxos,mempool} = require('./db');
const UTXO = require('./models/UTXO');
const Transaction = require('./models/Transaction');
const {verify} = require('./verify')
// create a server
const server = jayson.server({
  startMining: function(_, callback) {
    callback(null, 'success!');
    startMining();
  },
  stopMining: function(_, callback) {
    callback(null, 'success!');
    stopMining();
  },
  getBalance: function([address], callback) {
    const ourUTXOs = utxos.filter(x => {
      return x.owner === address && !x.spent;
    });


    const sum = ourUTXOs.reduce((p,c) => p + c.amount, 0);

    callback(null, {sum,a});
  },
  sendAmount: function([fromAddress,amount,toAddress,signature], callback) {
    
    let sum = 0
    const ourUTXOs = utxos.filter(x => {
      sum += x.amount
      return x.owner === fromAddress && !x.spent && sum-x.amount<amount;
    });
    
    console.log('a ver',ourUTXOs,sum)
    
    if (!verify(fromAddress,amount, signature)) return callback(null, 'Incorrect signature');
    if (sum>=amount) {
      const transferUTXO = new UTXO(toAddress, amount);
      const changeUTXO = new UTXO(fromAddress, sum-amount);
      const newTX = new Transaction(ourUTXOs, [transferUTXO,changeUTXO]);  
      mempool.push(newTX)
      return callback(null, 'Trx Added to mempool');
    }
    callback(null, 'Not enought balance');
  }
});

server.http().listen(PORT);
