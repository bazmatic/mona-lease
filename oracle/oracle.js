var fetch = require('node-fetch');
var Web3 = require('web3');
var {Contractdetails} = require('../src/actions/contract')
var monaLeaseContractBuild = require('../build/MonaLeaseDeployment.json');
var truffleContract = require('truffle-contract');
var ExchangeMarketURL = {
  IndependentReserve: 'https://api.independentreserve.com/Public/GetMarketSummary?primaryCurrencyCode=eth&secondaryCurrencyCode=aud',
};
var rates =  {
  AUD: 0
};
var cron = require('node-cron');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

var MonaLeaseContract = truffleContract({
  abi: monaLeaseContractBuild.abi
})
MonaLeaseContract.setProvider(web3.currentProvider);
var monaLeaseInstance = MonaLeaseContract.at(monaLeaseContractBuild.address);

async function MarketExchange(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return (json.LastPrice);
  } catch (error) {
    console.log(error);
  }
}
//buggy way of finding average -> need to change it
const ObtainRate = () => {
    (MarketExchange(ExchangeMarketURL.IndependentReserve)).then(function (rate) {
      rates.AUD += rate;
    });
}
cron.schedule('* * * * *', function () {
  ObtainRate();
});
ObtainRate();

module.exports = {
  ExchangeRate: function () {
    return rates;
  },
  SetExchangeRate: async function (rate) {
    monaLeaseInstance.giveExchangeRateAdvice(Math.round(rate * 100), 
    {from: Contract.OracleID}).then((TransactionsResult)=> {
      console.log(TransactionsResult);
    }, (error)=> {
      console.log("error: ", error);
    })
  } 
}