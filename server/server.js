var http = require("http");
var server = http.createServer(handleRequests);
var port = 11111;
var dbconnect = require("./db/dbconnect.js");
var serverFunctions = require("./serverFunctions/serverFunctions.js");
var queryString = require("querystring");

function handleRequests(request,response) {
	try {
	  var toExecute = serverFunctions.callbackFromRequest(request);
	  toExecute(queryString.parse(request.url.replace(/^.*\?/, '')), function(err,result) {
		response.setHeader("Content-Type","application/json");
		response.end(JSON.stringify(result));
	  });
	}catch(ex) {
		console.log("Uh " + ex);
		response.statusCode = 500;
		response.end("Se rompió, perdón");
	}
}
function init(port) {
	server.listen(port,function() {
		console.log("Arrancando a escuchar en puerto " + port);
	});
}

init(parseInt(process.argv[2]));