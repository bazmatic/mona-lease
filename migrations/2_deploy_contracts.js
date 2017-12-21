var MonaLease = artifacts.require("./MonaLease.sol");
var fs = require('fs');
var SHOW_EVENTS = false;

module.exports = async function(deployer) {
  await deployer.deploy(MonaLease, "Mona", 1, 1, "0x0", {gas: 5712388});
  console.log("Watching deployed contract at", MonaLease.address)

  if (SHOW_EVENTS) {
  	var Events = require("../src/events.js");
  	Events.watch(MonaLease.address, MonaLease.abi);
  	var monaLeaseInfo = {
  		address: MonaLease.address,
  		abi: MonaLease.abi,
  		byteCode: MonaLease.deployedByteCode
  	};

  	fs.writeFileSync("../build/MonaLeaseDeployment.json", JSON.stringify(monaLeaseInfo));

  }

};
