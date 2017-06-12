var getResponse = function(data) {
	var partidos = [
		{
			"id": 1,
			"cancha_id": 1,
			"cancha_nombre": "Oeste fútbol",
			"dia_semana": 7,
			"dia_mes": "11",
			"mes": "6",
			"anio": "2017",
			"hora": "15",
			"minutos": "00",
			"jugadores_totales": 10,
			"jugadores_actuales": 7
		},
		{
			"id": 2,
			"cancha_id": 1,
			"cancha_nombre": "Oeste fútbol",
			"dia_semana": 7,
			"dia_mes": "18",
			"mes": "6",
			"anio": "2017",
			"hora": "16",
			"minutos": "00",
			"jugadores_totales": 10,
			"jugadores_actuales": 10
		},
		{
			"id": 3,
			"cancha_id": 1,
			"cancha_nombre": "Oeste fútbol",
			"dia_semana": 3,
			"dia_mes": "14",
			"mes": "6",
			"anio": "2017",
			"hora": "21",
			"minutos": "00",
			"jugadores_totales": 10,
			"jugadores_actuales": 9
		}
	]
	return {
		"user": {
			"nombre": "Lucia",
			"apellido": "Julia",
			"zona": "devoto",
			"handicup": 25,
			"edad": 26
		},
		"partidos": partidos
	}
}

module.exports = {
	getResponse: getResponse
}