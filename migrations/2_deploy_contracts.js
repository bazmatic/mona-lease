var MonaLease = artifacts.require("./MonaLease.sol");
var fs = require('fs');
var Web3 = require('web3');


module.exports = async function(deployer) {
  await deployer.deploy(MonaLease, "Code Cave", 1, 100, web3.eth.accounts[0], {gas: 6721975});
  console.log("Watching deployed contract at", MonaLease.address)
	var monaLeaseInfo = {
		abi: MonaLease.abi,
    address: MonaLease.address
	};
fs.writeFileSync("C:/Users/norta/Documents/Internship/mona-lease/build/MonaLeaseDeployment.json", JSON.stringify(monaLeaseInfo));
};
