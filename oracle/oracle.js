var request = require('request');
var Web3 = require('web3');
var url = 'https://api.independentreserve.com/Public/GetMarketSummary?primaryCurrencyCode=eth&secondaryCurrencyCode=aud';
var monaLeaseContractBuild = require('../build/MonaLeaseDeployment.json');
var truffleContract = require('truffle-contract');

var rates =  {
  AUD: 0
};

var cron = require('node-cron');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

var MonaLeaseContract = truffleContract({
  abi: monaLeaseContractBuild.abi,
})
MonaLeaseContract.setProvider(web3.currentProvider);
var monaLeaseInstance = MonaLeaseContract.at(monaLeaseContractBuild.address);

function updateRate () {
  request ({
    url: url,
    json: true
    }, function (err, response, body) {
        if(response.statusCode === 200) {
          rates.AUD = body.DayAvgPrice;
          console.log("Today's average price of Eth in AUD is ", rates.AUD);
        }
    });
}
updateRate();
cron.schedule('* * * * *', updateRate);
function sendExchangeRate(rate){
  monaLeaseInstance.giveExchangeRateAdvice(Math.round(rate * 100), {from: web3.eth.accounts[0]}).then(function(transactionsID) {
    console.log("This is the transactionsID for the function giveExchangeRateAdvice: " + transactionsID.toString());
  });
}
var testRate = 12345;
sendExchangeRate(testRate);

exports.rates = rates;
