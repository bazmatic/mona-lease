var MonaLease = artifacts.require("./MonaLease.sol");
var SHOW_EVENTS = false;

module.exports = async function(deployer) {
  await deployer.deploy(MonaLease, "Mona", 1, 1, "0x0");
  console.log("Watching deployed contract at", MonaLease.address)

  if (SHOW_EVENTS) {
  	var Events = require("../src/events.js");
  	Events.watch(MonaLease.address, MonaLease.abi);
  }

};
