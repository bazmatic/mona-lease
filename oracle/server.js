/*
function onUserRequest(request, response) {
  console.log("User's address is: " + request.url);
  response.writeHead(200, {"Context-Type": "Text-Type"});
  response.write("Today's average price of Eth in AUD is " + );
  response.end();
}

http.createServer(onUserRequest).listen(8888);
*/

'use strict';
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const oracle = require('./oracle.js'); 

const oracleServer = express();
oracleServer.use(bodyParser.json());
oracleServer.use(bodyParser.urlencoded({ extended: true }));
//oracle.use(allowCrossDomain);
oracleServer.use(cookieParser());

oracleServer.get('/', function(req, res) {
	res.status(200).send("MonaLease Oracle");
});
oracleServer.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


oracleServer.post('/Rent', function(req, res) {
  try {
    var contractAddress = req.body.contractAddress;
    var timeCreated = Date.now();
    var landlordAddress = req.body.landlordAddress;
    var rentInterval = req.body.rentInterval;
    oracle.rentalPayment (landlordAddress, contractAddress, rentInterval);
    res.status(200).json({status: "success", data: req.body});
    oracle.runRentalPayment();
  }
  catch (e) {
    res.status(500).json({status: "contract Not created", error: e});
  }  
});

oracleServer.post('/ContractCreated', function(req, res) {
  try {
     var contractAddress = req.body.contractAddress;
     var oracleAddress = req.body.oracleAddress;
     var timeCreated = Date.now();
     oracle.setExchangeRate(contractAddress, oracleAddress, timeCreated);
     res.status(200).json({status: "success", data: req.body});
     oracle.runExchangeUpdate();
  }
  catch (e) {
    res.status(500).json({status: "contract Not created", error: e});
  }  
});

oracleServer.post('/Stop', function(req, res) {
  try {
    oracle.stopOracle();
    res.status(200).json({status: "success", data: req.body});
  }
  catch (e) {
    res.status(500).json({status: "contract Not created", error: e});
  }  
});

http.createServer(oracleServer).listen(8888, function(err) {
	if (err) {
		console.error(err);
	}
	else {
		console.log("Oracle listening");
	}
});


