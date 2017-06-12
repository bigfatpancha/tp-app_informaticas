var inicializacion = require("./inicializacion.js");
var detallePartido = require("./detallePartido.js");

var getController = function(pathname) {
	switch(pathname) {
		case "/partidosYa/inicializacion": return inicializacion;
		case "/partidosYa/detallePartido": return detallePartido;
	}
}


module.exports = {
	getController: getController
}