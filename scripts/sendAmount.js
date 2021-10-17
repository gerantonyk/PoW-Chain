const client = require('./client');
const {argv} = require('yargs');
const {fromAddress,amount,toAddress} = argv;

client.request('sendAmount', [fromAddress,amount,toAddress], function(err, response) {
  if(err) throw err;
  console.log(response.result);
});
