var MonaLease = artifacts.require("./MonaLease.sol");
var fs = require('fs');

module.exports = async function(deployer) {
  await deployer.deploy(MonaLease, "Code Cave", 1, 1, "0x0", {gas: 5712388});
  console.log("Watching deployed contract at", MonaLease.address)
	var monaLeaseInfo = {
		abi: MonaLease.abi,
    address: MonaLease.address
	};
  fs.writeFileSync("../build/MonaLeaseDeployment.json", JSON.stringify(monaLeaseInfo));
};
