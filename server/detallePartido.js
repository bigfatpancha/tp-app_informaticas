var getResponse = function(data) {
	var quienes = [
		{
			"id": 1,
			"nombre": "Lucia Julia",
			"handicup": 25
		},
		{
			"id": 2,
			"nombre": "Ayelen Bossero",
			"handicup": 263
		},
		{
			"id": 1,
			"nombre": "Macu",
			"handicup": 24
		}
	]
	return {
		"partido": {
			"donde": {
				"direccion": "Gaona 1231"
			},
			"cuando": {
				"dia": "11",
				"mes": "6",
				"anio": "2017",
				"hora": "15",
				"minutos": "30"
			},
			"quienes": quienes
		}
	}
}

module.exports = {
	getResponse: getResponse
}