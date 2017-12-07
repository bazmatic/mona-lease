var MonaLease = artifacts.require("./MonaLease.sol");
var Events = require("../src/events.js");

var renterCount = 5;

function report(text, transactionResult) {
	//console.log(text + ":", transactionResult.receipt.transactionHash);
}

contract('MonaLease', async function(accounts) {
	
	describe('Signing', function() {
		it("renters can sign lease", async function() {
			console.log("###Accounts", accounts);
			var instance = await MonaLease.deployed();
			var results = [];			
			for (var i=1; i<=renterCount; i++) {
				console.log("###", accounts[i])
				let renterName = "Renter " + i;
				let renterEmail = "renter." + i + "@codecavemaleny.com";
				let result = await instance.signLease(renterName, renterEmail, {from: accounts[i]});
				report('signLease', result);
				assert.ok(result);	
				results.push(result);
			}

		});
	});

	describe('Paying', function() {
		it("renters can pay into the lease", async function() {
			var instance = await MonaLease.deployed();
			for (var i=1; i<=renterCount-1; i++) {

				let result = await Events.sendContractTransaction(instance, {from: accounts[i], to: instance.address, value: web3.toWei(0.001, "ether")});
				report("pay", result);
				assert.ok(result);
			}
		})
	});


	describe('Rent run', function() {
		it("performs a rent run", function(done) {
			setTimeout(async function(instance) {
				var instance = await MonaLease.deployed();
				let result = await instance.run();
				report("run()", result);
				done();
			}, 1000);
		})
	});

	describe('Get balances', function() {
		it("shows the correct amounts owing", async function() {
			var instance = await MonaLease.deployed();
			for (var i=1; i<=renterCount; i++) {
				let result = await instance.getAmountDue.call(accounts[i]);
				assert.equal(result.constructor, Array);
				assert.equal(result.length, 2);
				//console.log('>>>',result,'<<<');
				result = {
					fiat: Number(result[0].toString())/100,
					wei: result[1].toString()
				};
				console.log(result);				
			}

		});
	})

});