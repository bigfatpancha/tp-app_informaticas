var http = require("http");
var server = http.createServer(handleRequests);
var port = 11111;
/*var dbconnect = require("./db/dbconnect.js");*/
var controllers = require("./serverControllers.js");
/*var queryString = require("querystring");*/
var url = require('url');

function handleRequests(request,response) {
	try {
		if(request.method == 'OPTIONS') {
		  	response.setHeader("Content-Type","application/json");
		  	response.setHeader("Access-Control-Allow-Origin","*")
		  	response.setHeader("Access-Control-Allow-Methods","*")
		  	response.setHeader("Access-Control-Allow-Headers","Content-Type")
		  	response.end()
		}
		if(request.method == 'POST') {
			response.setHeader("Content-Type","application/json");
		  	response.setHeader("Access-Control-Allow-Origin","*")
		  	response.setHeader("Access-Control-Allow-Methods","*")
		  	response.setHeader("Access-Control-Allow-Headers","Content-Type")
		  	var adr = request.url;
		  	var q = url.parse(adr, true);
		  	var pathname = q.pathname;
		  	console.log('path: ' + pathname)
		  	var controller = controllers.getController(pathname);
		  	console.log('request.method: ' + request.method)
	  		var body = '';
	        request.on('data', function (data) {
	            body += data;
	            console.log("Partial body: " + body);
	            var resp = controller.getResponse()
				console.log('respuesta: ' + resp)
	 	 		response.end(JSON.stringify(resp));
	        });
	        request.on('end', function () {
	            console.log("Body: " + body);
	        });
			
		}
		

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