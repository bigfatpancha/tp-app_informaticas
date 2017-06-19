var getResponse = function(bodyRaw, callback) {
	var body = JSON.parse(bodyRaw)
	console.log("se van a mandar invitacion al partido con id: " + body.data.id_partido + " a los siguientes usuarios...")
	for(var i = 0; i < body.data.selected.length; i++) {
		console.log(body.data.selected[i])	
	}
	return callback(null)
}

module.exports = {
	getResponse: getResponse
}