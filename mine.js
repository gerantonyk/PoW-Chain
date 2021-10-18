const Block = require('./models/Block');
const Transaction = require('./models/Transaction');
const UTXO = require('./models/UTXO');
const db = require('./db');
const {PUBLIC_KEY} = require('./config');
const TARGET_DIFFICULTY = BigInt("0x00" + "F".repeat(62));
const BLOCK_REWARD = 10;

let mining = true;
mine();

function startMining() {
  mining = true;
  mine();
}

function stopMining() {
  mining = false;
}

function mine() {
  if(!mining) return;

  const block = new Block();
  const len = db.mempool.length
  for(let i =0;i<len;i++ ) {
    block.addTransaction(db.mempool.shift())
  }

  const coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD);
  const coinbaseTX = new Transaction([], [coinbaseUTXO]);
  block.addTransaction(coinbaseTX);
  let prevHash = ''
  if(db.blockchain.blockHeight()>0) prevHash = db.blockchain.blocks[db.blockchain.blockHeight()-1].hash()
  block.execute(prevHash);

  while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
    block.nonce++;
  }
  console.log(db.blockchain)
  // console.log('antes',JSON.stringify(block.transactions))
 
  
  // console.log('despues', JSON.stringify(block.transactions))
  db.blockchain.addBlock(block);
  // console.log('utxos',db.utxos)
  // console.log('trn pool',db.mempool)
  
  console.log(`Mined block #${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`);

  setTimeout(mine, 5000);
}

module.exports = {
  startMining,
  stopMining,
};
