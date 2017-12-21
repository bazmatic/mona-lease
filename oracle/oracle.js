var request = require('request');
var url = 'https://api.independentreserve.com/Public/GetMarketSummary?primaryCurrencyCode=eth&secondaryCurrencyCode=aud';
var rates =  {
  AUD: 0
};

var cron = require('node-cron');


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

exports.rates = rates;
