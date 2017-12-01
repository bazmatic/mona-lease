var abi = require('../build/contracts/MonaLease.json').abi;
var address=process.argv[2];
var Web3 = require("web3");
web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));


exports.watch = function(address) {
	var MyContract = web3.eth.contract(abi);
	var myContractInstance = MyContract.at(address);
	var watcher = myContractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});
	console.log("Watching for events...");
	watcher.watch(function(err, data){
		if (err) {
			console.error(err);
		}
		else {
			console.log(">", data.args._description);
		}
	});	
}
