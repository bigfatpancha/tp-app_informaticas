var getResponse = function(bodyRaw, callback) {
	var body = JSON.parse(bodyRaw)
	console.log("se van a mandar notificiaciones a los siguientes usuarios...")
	for(var i = 0; i < body.data.length; i++) {
		console.log(body.data[i])	
	}
	return callback(null)
}

module.exports = {
	getResponse: getResponse
}