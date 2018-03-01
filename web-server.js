
/*

When running on a production server, a webserver is needed ;
This is our node program that servers as the webserver for this app

*/

var static = require('node-static');
 
var file = new static.Server('./build');
 
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(8080)

