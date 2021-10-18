const client = require('./client');
const {argv} = require('yargs');
const {fromAddress,amount,toAddress,signature} = argv;

client.request('sendAmount', [fromAddress,amount,toAddress,signature], function(err, response) {
  if(err) throw err;
  console.log(response.result);
});
