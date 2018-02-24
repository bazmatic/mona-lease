//-----Import Modules-----//
var MonaLease = artifacts.require("./MonaLease.sol");
var Events = require("../src/events.js");
var chaiAsPromised = require("chai-as-promised");
var chai = require("chai");
chai.use(chaiAsPromised);
var expect = chai.expect;
var assert = chai.assert;
var BigNumber = require("big-number");

//-----Global Variables-----//
var renterCount = 5;
const lastEthPriceAsFiat = 47500;

//-----MonaLease Tests-----//
contract('MonaLease', async function(accounts) {
	describe('SignLease', async()=> {

		it("should sign up 5 accounts into the lease as renters", async ()=> {
			var instance = await MonaLease.deployed();
			for (var i=1; i<=renterCount; i++) {
				let renterName = "Renter " + i;
				let renterEmail = "renter." + i + "@codecavemaleny.com";
				let leaseSignedDetails = await instance.signLease(renterName, renterEmail, {from: accounts[i]});
				assert(leaseSignedDetails.logs[0].args._description == "Signed lease");
			}
		});

		it("should throw error when existing accounts sign the lease again", async ()=> {
			var instance = await MonaLease.deployed();
			for (var i=1; i<=renterCount; i++) {
				let renterName = "Existing Renter " + i;
				let renterEmail = "Existing renter." + i + "@codecavemaleny.com";
				return expect(instance.signLease(renterName, renterEmail, {from: accounts[i]})).to.be.rejectedWith(Error);
			}
		});
	});
	describe("Renters",  function() {
		it("should return details of renters", async function() {
			var instance = await MonaLease.deployed();
			let AccIndex = 0, NameIndex = 1, EmailIndex = 2;
			for (var i=1; i<=renterCount; i++) {
				let signedRenterName = "Renter " + i;
				let signedRenterEmail = "renter." + i + "@codecavemaleny.com";
				let renterDetails = await instance.renters.call(accounts[i]);
				assert(renterDetails[AccIndex] == accounts[i]);
				assert(renterDetails[NameIndex] == signedRenterName);
				assert(renterDetails[EmailIndex] == signedRenterEmail);
			}
		});

		it("should return falsy values for accounts that are not renters",async ()=> {
			let instance = await MonaLease.deployed();
			let AccIndex = 0, NameIndex = 1, EmailIndex = 2;
			let nonRenterAcc = accounts[8];
			
			let renterDetails = await instance.renters.call(nonRenterAcc);
			expect(renterDetails[AccIndex]).to.not.equal(nonRenterAcc);
			expect(renterDetails[NameIndex]).to.empty;
			
		});

		it("should return address of renters", async ()=> {
			let instance = await MonaLease.deployed();
			let renterIndex = 0;
			for(var i=1; i<=renterCount; i++, renterIndex++) {
				let Renteraccount = await instance.renterList.call(renterIndex);
				assert(Renteraccount == accounts[i]);
			}

		});

		it("should throw error for accounts that are not renters", async ()=> {
			let instance = await MonaLease.deployed();
			let nonRenterIndex = 6;
			return expect(instance.renterList.call(nonRenterIndex)).to.be.rejectedWith(Error);
		})
	});

	describe("Deposit", function () {
		it("should deposit 10 wei into renter 3's escrow", async function() {
			let instance = await MonaLease.deployed();
			let renter3Acc = accounts[2];
			let weiHeldIndex = 3;
			let rentDetails = await instance.renters.call(renter3Acc);
			let weiHeldBalance = rentDetails[weiHeldIndex];
			let depositDetail = await instance.deposit(renter3Acc, {from: renter3Acc, value: 10});
			rentDetails = await instance.renters.call(renter3Acc);
			assert(rentDetails[3].toNumber() == (parseInt(weiHeldBalance)+10));
			assert(depositDetail.logs[0].event == "paymentAccepted");
			
		});

		it("should send 10 wei into contract from renter 3", async function () {
			let instance = await MonaLease.deployed();
			let renterDetails = await instance.renters.call(accounts[2]);
			let weiHeldBalance = renterDetails[3];
			let sendTransaction = await instance.sendTransaction({from: accounts[2], value: 10});
			renterDetails = await instance.renters.call(accounts[2]);
			assert(renterDetails[3].toNumber() == (parseInt(weiHeldBalance)+10));
			assert(sendTransaction.logs[0].event == "paymentAccepted");
		});

		it("should throws error when non renter sends wei to contract", async function () {
			let instance = await MonaLease.deployed();
			let nonRenter = accounts[6];
			return expect(instance.sendTransaction({from: nonRenter, value: web3.toWei(1, "ether")})).to.be.rejectedWith(Error);
		});

		it("should throw error when renter sends 0 wei into escrow", async ()=> {
			let instance = await MonaLease.deployed();
			let renter3Acc = accounts[2];
			let zeroWei = 0;
			let depositDetail = await instance.deposit(renter3Acc, {from: renter3Acc, value: zeroWei});
			assert(depositDetail.logs[0].event == "paymentDeclined");
		});

		it("should throw error when non renter deposits wei", async ()=> {
			let instance = await MonaLease.deployed();
			let nonRenter = accounts[6];
			let weiAmount = 100000;
			return expect(instance.deposit.call(nonRenter, {value: weiAmount})).to.be.rejectedWith(Error);
		});
	});

	describe('Amount Due', function() {
		it("should return rent amount due for renter 3", async function() {
			var instance = await MonaLease.deployed();
			let renter = await instance.renters.call(accounts[2]);
			let amountDue = await instance.getAmountDue.call(accounts[2], {from:accounts[2]});
			assert.isAbove(amountDue.toNumber(), -1);
		});
	});

	describe("Oracle Transaction", function () {
		it("should sends exchange rate to contract", async ()=> {
			var instance = await MonaLease.deployed();
			let ExchRate = 1200;
			const oracleAcc = accounts[0];
			let lastEthPrice = await instance.lastEthPriceAsFiat.call();
			assert(lastEthPriceAsFiat == lastEthPrice);
			let transactionInfo = await instance.giveExchangeRateAdvice(ExchRate, {from: oracleAcc});
			let currentEthPrice = await instance.lastEthPriceAsFiat.call();
			assert(ExchRate == currentEthPrice, "Exchange rate is the current Eth Price in the contract");
		});
		it("should throw error when account sending oracle isn't the set oracle account", async ()=> {
			var instance = await MonaLease.deployed();
			let nonOracleAcc = accounts[1];
			return expect(instance.giveExchangeRateAdvice(1200, {from: nonOracleAcc})).to.be.rejectedWith(Error);
		});
	});

	describe("Run rent", function () {
		it("first four renters deposit 1 eth to weiHeld", async ()=> {
			var instance = await MonaLease.deployed(); 
			let fourRenter = 4;
			for(let i=1; i<=fourRenter; i++) {
				let depositDetail = await instance.deposit(accounts[i], {from: accounts[i], value: web3.toWei(1, "ether")});
			}
		}); 

		it("should pay rent for the first four accounts", async ()=> {
			var instance = await MonaLease.deployed();
			let fourRenter = 4;
			let rentalPayment = await instance.run();
			let eventIndex = 1;
			for(let i = 1; i <= fourRenter; i++, eventIndex+=2) {
			assert(rentalPayment.logs[eventIndex].event == "rentPaid");
			assert(rentalPayment.logs[eventIndex].args.renterAddress , accounts[i]);
			}
		});

		it("should decline payment for the fifth renter", async ()=> {
			var instance = await MonaLease.deployed();
			let fifthRenterDetail = await instance.renters.call([accounts[5]]);
			assert(fifthRenterDetail[7] , true);
		})
	
	});

	
});
