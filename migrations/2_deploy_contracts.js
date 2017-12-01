var MonaLease = artifacts.require("./MonaLease.sol");


module.exports = async function(deployer) {
  await deployer.deploy(MonaLease, "Mona", 300, 300, "0x0");
  console.log("***", MonaLease.address);
  var Events = require("../src/events.js");
  Events.watch(MonaLease.address);
};
