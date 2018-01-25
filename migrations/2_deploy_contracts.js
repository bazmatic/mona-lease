var MonaLease = artifacts.require("./MonaLease.sol");
var fs = require('fs');


module.exports = async function(deployer) {
  await deployer.deploy(MonaLease, "Code Cave", 1, 100, "0xc9ed4b6be028099c565b13afd007a5ac22e3b6b5", {gas: 6721975});
  console.log("Watching deployed contract at", MonaLease.address)
	var monaLeaseInfo = {
		abi: MonaLease.abi,
    address: MonaLease.address
	};
fs.writeFileSync("C:/Users/norta/Documents/Internship/mona-lease/build/MonaLeaseDeployment.json", JSON.stringify(monaLeaseInfo));
};
