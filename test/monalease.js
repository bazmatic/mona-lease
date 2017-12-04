var MonaLease = artifacts.require("./MonaLease.sol");

var renterCount = 4;

contract('MonaLease', async function(accounts) {
	
	describe('Signing', function() {
		it("renters can sign lease", async function() {
			var instance = await MonaLease.deployed();
			var results = [];			
			for (var i=1; i<=renterCount; i++) {
				let renterName = "Renter " + i;
				let renterEmail = "renter." + i + "codecavemaleny.com";
				let result = await instance.signLease(renterName, renterEmail, {from: accounts[i]});
				assert.ok(result);	
				results.push(result);
			}
			/*
			results.forEach(function(result){
				console.log(result.tx)
			});
			*/
		});
	});

	describe('Paying', function() {
		it("renters can pay into the lease", async function() {
			var instance = await MonaLease.deployed();
			for (var i=1; i<=renterCount-1; i++) {
				let result = await instance.send(web3.toWei(0.001, "ether", {from: accounts[i]}));
				assert.ok(result);
			}
		})
	});


	describe('Dues', function() {
		it("performs a rent run", function(done) {
			
			setTimeout(async function(instance) {
				var instance = await MonaLease.deployed();
				await instance.run();
				done();
			}, 1000);
		});
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