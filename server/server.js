var http = require("http");
var server = http.createServer(handleRequests);
var port = 11111;
/*var dbconnect = require("./db/dbconnect.js");*/
var controllers = require("./serverControllers.js");
/*var queryString = require("querystring");*/
var url = require('url');

function handleRequests(request,response) {
	try {
	  
	  /*toExecute(request.url, function(err,result) {
		response.setHeader("Content-Type","application/json");
		response.end(JSON.stringify(result));
	  });*/
	  	response.writeHead(200, {'Content-Type': 'text/html'});
	  	var adr = request.url;
	  	var q = url.parse(adr, true);
	  	var pathname = q.pathname;
	  	console.log(pathname)
	  	var controller = controllers.getController(pathname);
	  	response.write(q.pathname);
	  	response.end();
	} catch(ex) {
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