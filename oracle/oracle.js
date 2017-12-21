var request = require('request');
var Web3 = require('web3');
var url = 'https://api.independentreserve.com/Public/GetMarketSummary?primaryCurrencyCode=eth&secondaryCurrencyCode=aud';
var monaLeaseContractBuild = require('../build/MonaLeaseDeployment.json');
var truffleContract = require('truffle-contract');

var rates =  {
  AUD: 0
};

var cron = require('node-cron');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

var MyContract = truffleContract({
  abi: monaLeaseContractBuild.abi ,
  unlinked_binary: monaLeaseContractBuild.deployedByteCode,
  address: monaLeaseContractBuild.address // optional
  // many more
})
MyContract.setProvider(provider);


function updateRate () {
  request ({
    url: url,
    json: true
    }, function (err, response, body) {
        if(response.statusCode === 200) {
          rates.AUD = body.DayAvgPrice;
          console.log("To day's average price of Eth in AUD is ", rates.AUD);
        }
    });
}
updateRate();
cron.schedule('* * * * *', updateRate);

function sendRateAdvice() {

}

exports.rates = rates;
