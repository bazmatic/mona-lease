  var fetch = require('node-fetch');
  var Web3 = require('web3');
  var monaLeaseContractBuild = require('../build/contracts/MonaLease.json');
  var truffleContract = require('truffle-contract');
  var ExchangeMarketURL = {
    IndependentReserve: 'https://api.independentreserve.com/Public/GetMarketSummary?primaryCurrencyCode=eth&secondaryCurrencyCode=aud'
  };
  var rates;

  var cron = require('node-cron');
  var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
  var MonaLeaseContract = truffleContract({
    abi: monaLeaseContractBuild.abi
  })
  MonaLeaseContract.setProvider(web3.currentProvider);
  var contractAddress, oracleAddress, timeCreated, landlordAddress, rentInterval;
  var runExchangeUpdate, runRental;
  var TransactionsResult;

async function setExchangeRate (_contractAddress, _oracleAddress, _timeCreated) {
    contractAddress = _contractAddress;
    oracleAddress = _oracleAddress;
    timeCreated = _timeCreated;
    var monaLeaseInstance = MonaLeaseContract.at(contractAddress);
    MarketExchange(ExchangeMarketURL.IndependentReserve).then(function (rate) {
      rates = rate;
      monaLeaseInstance.giveExchangeRateAdvice(Math.round(rate), 
      {from: oracleAddress, gas: 1000000}).then((res)=> {
        console.log("Contract Updated");
        TransactionsResult = res;
      }, (error)=> {
        console.log("error: ", error);
      })
    });
} 

function runOracle () {
  console.log("Updating the Contract with today's exchange rate....\n");
  runExchangeUpdate = setInterval(  function()  { 
    setExchangeRate(contractAddress, oracleAddress, timeCreated);
  }, 3000);
  
}

function stopOracle () {
  console.log("Stop the oracle from updating the contract \n");
  clearInterval(runExchangeUpdate);
}

function rentalPayment (_landlordAddress, _contractAddress, _rentInterval) {
  landlordAddress = _landlordAddress;
  rentInterval = _rentInterval;
  contractAddress = _contractAddress;
  var monaLeaseInstance = MonaLeaseContract.at(_contractAddress);
  monaLeaseInstance.run({from: landlordAddress, gas: 1000000}).then(
    (res) => {
      //console.log(res);
      console.log("Rent Run Success. \n");
                

    }).catch(function(e) {
        console.log("error: ", e);
      })
}

function runRentalPayment () {
  console.log("Oracle will now run rental payments every: ", rentInterval, " seconds. \n");
  runRental = setInterval(  function()  { 
    rentalPayment(landlordAddress, contractAddress, rentInterval);
  }, rentInterval * 1000); 
}

module.exports.setExchangeRate = setExchangeRate;
module.exports.runExchangeUpdate = runOracle;
module.exports.stopOracle = stopOracle;
module.exports.rentalPayment = rentalPayment;
module.exports.runRentalPayment = runRentalPayment;

async function MarketExchange(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return (json.LastPrice);
  } catch (error) {
    console.log(error);
  }
}
