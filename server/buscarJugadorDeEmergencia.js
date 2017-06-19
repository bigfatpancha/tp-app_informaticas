var dbconnect = require("./db/dbconnect.js");

var getResponse = function(bodyRaw, callback) {
	var body = JSON.parse(bodyRaw)
	console.log("handicup: " + body.data.handicup)
	dbconnect.select_jugadores_by_handicup([body.data.handicup, body.data.handicup], function(err, rows){
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