var http = require('http');
var oracle = require('./oracle.js');

function onUserRequest(request, response) {
  console.log("User's address is: " + request.url);
  response.writeHead(200, {"Context-Type": "Text-Type"});
  response.write("Today's average price of Eth in AUD is " + oracle.ExchangeRate().AUD.toString());
  response.end();
}

http.createServer(onUserRequest).listen(8888);
console.log("The server is running");
