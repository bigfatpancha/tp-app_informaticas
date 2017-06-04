angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', '$state', 'DetallePartidoService',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, DetallePartidoService) {
	$scope.goTo = function(pantalla) {
		$state.go(pantalla);
	}

	$scope.detallePartido = function(id) {
		DetallePartidoService.parsePartido("asd")
		$state.go('menu.detallePartido')
	}

}])

.service("DetallePartidoService", function() {
	this.partido = {}

	this.parsePartido = function(resp) {
		this.partido = {}
		this.partido.id = 1
		this.partido.donde = {
			"direccion": "Gaona 1231"
		}
		this.partido.cuando = {
			"dia": "10",
			"mes": "06",
			"anio": "2017",
			"hora": "18",
			"minutos": "00"
		}
		this.partido.quienes = [
		{
				"id": 1,
				"nombre": "Lucia",
				"apellido": "Julia",
				"handicup": 25
			},
			{
				"id": 2,
				"nombre": "Ayelen",
				"apellido": "Bossero",
				"handicup": 26
			},
			{
				"id": 3,
				"nombre": "Nahuel",
				"apellido": "Sosa",
				"handicup": 40
			}
		]
	}
})
   
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
   
.controller('partidoNuevoDondeCtrl', ['$scope', '$stateParams', '$state', 'HorariosService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, HorariosService) {
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
		HorariosService.parseHorarios("asdasd");
		$state.go('menu.partidoNuevoCuando')
	}

}])

.service("HorariosService", function() {
	this.horarios = []

	this.parseHorarios = function(resp) {
		this.horarios = [
			{
				"dia": "10",
				"mes": "06",
				"anio": "2017",
				"hora": "19",
				"minutos": "00",
				"id": 1
			},
						{
				"dia": "10",
				"mes": "06",
				"anio": "2017",
				"hora": "18",
				"minutos": "00",
				"id": 2
			},
						{
				"dia": "11",
				"mes": "06",
				"anio": "2017",
				"hora": "17",
				"minutos": "00",
				"id": 3
			},
						{
				"dia": "11",
				"mes": "06",
				"anio": "2017",
				"hora": "18",
				"minutos": "00",
				"id": 4
			}
		]
	}
})
   
.controller('partidoNuevoCuandoCtrl', ['$scope', '$stateParams', '$state', 'HorariosService', 'InvitarAmigosService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, HorariosService, InvitarAmigosService) {
	$scope.horarios = HorariosService.horarios

	var meses = {"01": "enero", "02": "febrero",
				"03": "marzo", "04": "abril",
				"05": "mayo", "06": "junio",
				"07": "julio", "08": "agosto",
				"09": "septiembre", "10": "octubre",
				"11": "noviembre", "12": "diciembre"}
	$scope.formatMes = function(mes) {
		return meses[mes]
	}

	$scope.goToPaso3 = function(horario) {
		//TODO buscar usuarios con ese horario disponible
		InvitarAmigosService.parseAmigos('rwerw')
		$state.go('menu.partidoNuevoInvitarAmigos')
	}
}])

.service("InvitarAmigosService", function() {
	this.amigos = []

	this.parseAmigos = function(resp) {
		this.amigos = [
			{
				"id": 1,
				"nombre": "Lucia",
				"apellido": "Julia",
				"handicup": 25
			},
			{
				"id": 2,
				"nombre": "Ayelen",
				"apellido": "Bossero",
				"handicup": 26
			},
			{
				"id": 3,
				"nombre": "Nahuel",
				"apellido": "Sosa",
				"handicup": 40
			}
		]
	}
})
   
.controller('partidoNuevoInvitarAmigosCtrl', ['$scope', '$stateParams', '$state', 'InvitarAmigosService', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, InvitarAmigosService, $ionicPopup) {
	$scope.amigos = InvitarAmigosService.amigos
	$scope.amigosElegidos = []

	$scope.mandarInvitaciones = function() {

		//TODO mandar invitaciones
		$ionicPopup.alert({
			title: 'Invitaciones enviadas correctamente',
			buttons: [
				{
					text: 'volver al home',
					type: 'button-positive',
					onTap: function(e) {
						$state.go('menu.home')
					}
				}
			]
		})
	}

}])

.controller('partidoCtrl', ['$scope', '$stateParams', '$state', 'DetallePartidoService', 'ElegirJugadoresEmergenciaService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, DetallePartidoService, ElegirJugadoresEmergenciaService) {
	$scope.partido = DetallePartidoService.partido

	$scope.buscarJugadorDeEmergencia = function(id) {
		//TODO buscar jugadores para un partido determinado
		ElegirJugadoresEmergenciaService.parseJugadores("asd")
		$state.go('menu.elegirJugadores')
	}

}])

.service("ElegirJugadoresEmergenciaService", function() {
	this.jugadores = []

	this.parseJugadores = function(resp) {
		this.jugadores = [
			{
				"id": 1,
				"nombre": "Belen",
				"apellido": "Spinelli",
				"handicup": 20
			},
			{
				"id": 2,
				"nombre": "Julieta",
				"apellido": "Luduenia",
				"handicup": 15
			},
			{
				"id": 3,
				"nombre": "Martin",
				"apellido": "Moreira",
				"handicup": 40
			},
			{
				"id": 4,
				"nombre": "Hernan",
				"apellido": "Williams",
				"handicup": 35
			}
		]
	}
})

.controller('elegiATusJugadoresCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', 'ElegirJugadoresEmergenciaService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicPopup, ElegirJugadoresEmergenciaService) {
	$scope.jugadores = ElegirJugadoresEmergenciaService.jugadores

	 $scope.mandarInvitaciones = function() {

		//TODO mandar invitaciones
		$ionicPopup.alert({
			title: 'Invitaciones enviadas correctamente',
			buttons: [
				{
					text: 'volver al home',
					type: 'button-positive',
					onTap: function(e) {
						$state.go('menu.home')
					}
				}
			]
		})
	}

}])
 