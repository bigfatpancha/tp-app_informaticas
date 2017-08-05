var dbconnect = require("./db/dbconnect.js");

var getResponse = function(bodyRaw, callback) {
	var body = JSON.parse(bodyRaw)
	console.log(body)
	console.log("handicup: " + body.data.data.handicup)
	console.log("id_partido: ", body.data.data.id_partido)
	dbconnect.select_jugadores_by_handicup([body.data.data.handicup, body.data.data.handicup, body.data.data.id_partido], function(err, rows){
		if(rows.length == 0) {
			console.log("id partido no existe")
		} else {
			console.log(rows)
			var quienes = []
			for(var i = 0; i < rows.length; i++) {
				var row = rows[i]
				var jugador = {}
				jugador.id = row.id_jugador
				jugador.nombre = row.nombre
				jugador.apellido = row.apellido
				jugador.genero = row.genero
				jugador.handicup = row.handicup
				quienes.push(jugador)
			}
			return callback(quienes)
		}
	})
}

module.exports = {
	getResponse: getResponse
}