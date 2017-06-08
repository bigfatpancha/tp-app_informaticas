var app = angular.module('ajaxApp', []);
app.factory('ajaxFunctions', [ '$http', '$q', '$ionicLoading', '$ionicPopup', function($http, $q, $ionicLoading, $ionicPopup) {
	
	function crearMensaje(data) {
		var mensaje = {
			header:  {
			},
			data: data
		};
		return mensaje;
		}
	
	var optionsSend = {data: "",
					   dataType: "json",
					   withCredentials: false, 
					   headers: {'Content-Type': 'application/json; charset=utf-8'},
					   async: true
					  }
	
	var callbackError
    var setCallbackErrorDefault = function(newCallback) {
       callbackError = newCallback;
	}
	
	var realizarPedidoAjax = function realizarPedidoAjax(options){
		angular.extend( optionsSend, options ); 
		var deferred = $q.defer();

		$http({
			url: optionsSend.url,
			data : crearMensaje(optionsSend.data),
			method : optionsSend.method,
			dataType: optionsSend.dataType,
			withCredentials: optionsSend.withCredentials,
			headers: optionsSend.headers,
			async: optionsSend.async,
			cache: true
		}).then(function mySucces(response) {
	        deferred.resolve(response.data);
	    }, function myError(error) {
	    	$ionicLoading.hide();
	    	var alertPopup = $ionicPopup.alert({
                title: 'No se pudieron cargar los datos'
            });    
	        console.log('Error realizando pedido ajax.' + error)
	    });
		
		return deferred.promise;
	}

	return {
		realizarPedidoAjax : realizarPedidoAjax,
		setCallbackErrorDefault: setCallbackErrorDefault
	}
}]);