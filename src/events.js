//var abi = require('../build/contracts/MonaLease.json').abi;
var address=process.argv[2];
var Web3 = require("web3");
web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));


exports.watch = function(address, abi) {

	var MyContract = web3.eth.contract(abi);
	var myContractInstance = MyContract.at(address);
	var watcher = myContractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});

	watcher.watch(function(err, data){
		if (err) {
			console.error(err);
		}
		else {
			if (data.args) {
				if (data.args._description) {
					console.log(">", data.args._description);
				}
				else {
					console.log(data.event, data.args);
				}
			}

		}
	});
}

exports.sendContractTransaction = function(contract, obj) {
	return new Promise(function(resolve, reject) {
		//console.log(obj);
		let contractTransaction = contract.sendTransaction(obj);
		contract.allEvents({fromBlock: 0, toBlock: 'latest'}).watch(function(err, data) {
			if (err) {
				reject(err);
			}
			else {
				//console.log(data);
				if (data && data.type == 'mined' && data.transactionHash) {
					//console.log("Mined");
					resolve(data);
				}
			}
		})
	})
}
