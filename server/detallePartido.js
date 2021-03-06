var dbconnect = require("./db/dbconnect.js");

var getResponse = function(bodyRaw, callback) {
	var body = JSON.parse(bodyRaw)
	console.log("id jugador: " + body.data.id)
	dbconnect.select_partido_by_id([body.data.id], function(err, rows){
		if(rows.length == 0) {
			console.log("id partido no existe")
		} else {
			console.log(rows)
			var direccion = rows[0].direccion
			var nombre = rows[0].nombre_cancha
			var tamanio = rows[0].tamanio
			var fecha = rows[0].fecha
			var hora = rows[0].hora
			var quienes = []
			for(var i = 0; i < rows.length; i++) {
				var row = rows[i]
				var jugador = {}
				jugador.id = row.id_jugador
				jugador.nombre = row.nombre
				jugador.handicup = row.handicup
				quienes.push(jugador)
			}
			return callback({
				"donde": {
					"direccion": direccion,
					"nombre": nombre,
					"tamanio": tamanio
				},
				"cuando": {
					"fecha": fecha,
					"hora": hora
				},
				"quienes": quienes
			})
		}
	})
}

module.exports = {
	getResponse: getResponse
}