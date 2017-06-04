angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', '$state',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
	$scope.goTo = function(pantalla) {
		$state.go(pantalla);
	}

}])
   
.controller('cartCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cloudCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('partidoNuevoDondeCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
	$scope.canchas = []
	$scope.donde = {}
	$scope.donde.tamanio = "1" // 1: 5, 2: 7, 3: 11
	$scope.donde.piso = "2" // 1: cesped, 2: cesped sintetico, 3: cemento
	$scope.donde.techada = false

	var input = document.getElementById('dondeDireccion');
    var options = {
            componentRestrictions: {country: 'ar'}
        };
    var autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        var geometry = place.geometry;
        $scope.donde.direccion = {}
        if ((geometry) !== undefined) {
            $scope.direccionBuscada.latitud = geometry.location.lat();
            $scope.direccionBuscada.longitud = geometry.location.lng();
        }
    });

	$scope.buscar = function() {
		// TODO hacer pedido al servidor
		$scope.canchas = [
			{
				"nombre": 'Oeste futbol',
				"tananio": "1",
				"piso": "2",
				"direccion": "Gaona 3213",
				"id": 1
			},
			{
				"nombre": 'Burrito Martinez',
				"tananio": "1",
				"piso": "2",
				"direccion": "Cramer 788",
				"id": 2
			}
		]
	}

	$scope.goToPaso2 = function(cancha) {
		//TODO buscar horarios disponibles de la cancha
		$state.go('partidoNuevoCuando')
	}

}])
   
.controller('partidoNuevoCuandoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('partidoNuevoInvitarAmigosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 