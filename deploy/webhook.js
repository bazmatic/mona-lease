
/*

Webhook to react to push event for particular branch of this repo
v1 is going to be fully hard coded while I figure out webhooks
can make this a generic component later

*/


const http = require('http')
const url  = require('url')
let   PORT = 4552

const server = http.createServer(function(req, res) {
    // Parse the params - prints "{ abcd: 'efgh' }"
    var URLParams = url.parse(req.url, true).query;
    console.log(URLParams);

    // How do I access the JSON payload as an object?
    var body = [];
    req.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();
        if (body) console.log(JSON.parse(body));
        res.end('It Works!!');
    });
}).listen(PORT)


