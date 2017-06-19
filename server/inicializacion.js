var dbconnect = require("./db/dbconnect.js");

var tamanios = {"1": 10, "2": 14, "3": 22}

var getResponse = function(bodyRaw, callback) {
	var body = JSON.parse(bodyRaw)
	console.log("id jugador: " + body.data.id)
	dbconnect.select_jugador_by_id([body.data.id], function(err, rows){
		if(rows.length == 0) {
			console.log("id jugador no tiene partidos")
			dbconnect.select_solo_jugador_by_id([body.data.id], function(err, rows) {
				if(rows.length == 0) {
					console.log("id jugador no existe")
					return callback({"respuesta": "ERROR"})
				} else {
					var nombre = rows[0].nombre
					var apellido = rows[0].apellido
					var handicup = rows[0].handicup
					var edad = rows[0].edad
					return callback({
						"respuesta": "SIN PARTIDOS",
						"user": {
							"nombre": nombre,
							"apellido": apellido,
							"zona": "devoto",
							"handicup": handicup,
							"edad": edad
						},
						"partidos": []
					})
				}
			})
		} else {
			var partidos = []
			var nombre = rows[0].nombre
			var apellido = rows[0].apellido
			var handicup = rows[0].handicup
			var edad = rows[0].edad
			for(var i = 0; i < rows.length; i++) {
				var row = rows[i]
				var id = row.id_partido
				var cancha_nombre = row.nombre_cancha
				var fecha = row.fecha
				var hora = row.hora
				var jugadores_totales = tamanios[row.tamanio]
				var partido = {
					"id": id,
					"cancha_nombre": cancha_nombre,
					"fecha": fecha,
					"hora": hora,
					"jugadores_totales": jugadores_totales
				}
				partidos.push(partido)
			}
			return callback({
				"respuesta": "OK",
				"user": {
					"nombre": nombre,
					"apellido": apellido,
					"zona": "devoto",
					"handicup": handicup,
					"edad": edad
				},
				"partidos": partidos
			})
		}
	})
}

module.exports = {
	getResponse: getResponse
}