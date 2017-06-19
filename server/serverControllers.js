var inicializacion = require("./inicializacion.js");
var detallePartido = require("./detallePartido.js");
var buscarJugadorDeEmergencia = require("./buscarJugadorDeEmergencia.js");
var mandarInvitaciones = require("./mandarInvitaciones.js")

var getController = function(pathname) {
	switch(pathname) {
		case "/partidosYa/inicializacion": return inicializacion;
		case "/partidosYa/detallePartido": return detallePartido;
		case "/partidosYa/buscarJugadorDeEmergencia": return buscarJugadorDeEmergencia;
		case "/partidosYa/mandarInvitaciones": return mandarInvitaciones;
	}
}


module.exports = {
	getController: getController
}