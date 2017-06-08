var inicializacion = require("./inicializacion.js");

var getController = function(pathname) {
	switch(pathname) {
		case "/partidosYa/inicializacion": return inicializacion;
	}
}


module.exports = {
	getController: getController
}