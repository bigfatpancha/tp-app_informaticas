angular.module('app.controllers', ['ionic','ngCordova','ajaxApp'])
  
.controller('homeCtrl', ['$scope', '$stateParams', '$state', 'DetallePartidoService', 'ajax', '$rootScope', '$ionicPopup',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, DetallePartidoService, ajax, $rootScope, $ionicPopup) {
	$scope.homeData = {}
	$rootScope.init = function() {
		ajax
            .cargarHome()
            .then(function(resp) {
            	parse(resp);
            })
	}

	function parse(resp) {
		if(resp.respuesta == "OK") {
			console.log(resp)
			$scope.homeData.user = resp.user;
			$scope.homeData.partidos = resp.partidos	
		} else if(resp.respuesta == "SIN PARTIDOS") {
			$scope.homeData.user = resp.user;
			$scope.homeData.partidos = resp.partidos	
			$ionicPopup.alert({
				title: 'No tenés partidos pendientes',
				buttons: [
					{
						text: 'Ok',
						type: 'button-positive'
					}
				]
			})
		} else {
			$ionicPopup.alert({
				title: 'El usuario no existe',
				buttons: [
					{
						text: 'Ok',
						type: 'button-positive'
					}
				]
			})
		}
		
	}
	var meses = {
		"01": "ene",
		"02": "feb",
		"03": "mar",
		"04": "abr",
		"05": "may",
		"06": "jun",
		"07": "jul",
		"08": "ago",
		"09": "sep",
		"10": "oct",
		"11": "nov",
		"12": "dec"
	}
	$scope.formatFecha = function(fecha) {
		return fecha.substring(8,10) + " de " + meses[fecha.substring(5,7)] + " de " + fecha.substring(0,4)
	}

	$scope.formatHora = function(hora) {
		return hora.substring(0,5)
	}

	$scope.goTo = function(pantalla) {
		$state.go(pantalla);
	}

	$scope.detallePartido = function(id) {
		console.log("id partido: " + id);
		ajax
            .detallePartido(id)
            .then(function(resp) {
            	console.log(resp)
            	DetallePartidoService.parsePartido(resp)
            	DetallePartidoService.setIdPartido(id)
				$state
					.go('menu.detallePartido')	
					.then(function() {
                        $rootScope.initDetallePartido();
                    })
            })
		
	}

}])

.service("DetallePartidoService", function() {
	this.partido = {}

	this.parsePartido = function(resp) {
		var handicup_prom = calcularProm(resp.quienes)
		this.partido = {
			"donde": resp.donde,
			"cuando": resp.cuando,
			"quienes": resp.quienes,
			"handicup": handicup_prom
		}
	}

	this.setIdPartido = function(id) {
		this.partido.id = id;
	}

	function calcularProm(jugadores) {
		var sum = 0;
		for(var i = 0; i < jugadores.length; i++) {
			sum += jugadores[i].handicup
		}
		return sum / jugadores.length
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
   
.controller('menuCtrl', ['$scope', '$stateParams', '$state', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $rootScope) {
	$scope.goTo = function(pantalla) {
		$state
            .go(pantalla)
            /*.then(function(){
                $rootScope.init()
            });*/
	}

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

.controller('partidoCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'DetallePartidoService',
'ElegirJugadoresEmergenciaService', 'ajax', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $stateParams, $state, DetallePartidoService, ElegirJugadoresEmergenciaService,
 ajax, $ionicLoading) {
	$rootScope.initDetallePartido = function() {
		console.log(DetallePartidoService.partido)
		$scope.partido = DetallePartidoService.partido
	}

	var meses = {
		"01": "ene",
		"02": "feb",
		"03": "mar",
		"04": "abr",
		"05": "may",
		"06": "jun",
		"07": "jul",
		"08": "ago",
		"09": "sep",
		"10": "oct",
		"11": "nov",
		"12": "dec"
	}
	$scope.formatFecha = function(fecha) {
		return fecha.substring(8,10) + " de " + meses[fecha.substring(5,7)] + " de " + fecha.substring(0,4)
	}

	$scope.formatHora = function(hora) {
		return hora.substring(0,5)
	}

	var tamanios = {"1": 10, "2": 14, "3": 22}
	$scope.formatTamanio = function(tamanio) {
		return tamanios[tamanio]
	}

	$scope.buscarJugadorDeEmergencia = function(handicup) {
		var menor = handicup - 5
		var mayor = handicup + 5
		var content = 'Buscando jugadores con handicup entre ' + menor + ' y ' + mayor
		$ionicLoading.show()
		ajax
			.buscarJugadorDeEmergencia(handicup)
			.then(function(resp) {
				$ionicLoading.hide()
				ElegirJugadoresEmergenciaService.parseJugadores(resp)
				$state.go('menu.elegirJugadores')
				
			})
	}

}])

.service("ElegirJugadoresEmergenciaService", function() {
	this.jugadores = []

	this.parseJugadores = function(resp) {
		console.log(resp)
		this.jugadores = resp
	}
})

.controller('elegiATusJugadoresCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', 
'ElegirJugadoresEmergenciaService', '$ionicLoading', 'ajax', 'DetallePartidoService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicPopup, ElegirJugadoresEmergenciaService, $ionicLoading, ajax, DetallePartidoService) {
	$scope.jugadores = ElegirJugadoresEmergenciaService.jugadores
	$scope.selected = [];
	$scope.selectJugador = function(id, $event) {
		var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        if (action == 'add' & $scope.selected.indexOf(id) == -1) $scope.selected.push(id);
        if (action == 'remove' && $scope.selected.indexOf(id) != -1) $scope.selected.splice($scope.selected.indexOf(id), 1);

        console.log($scope.selected)
	}

	$scope.data = {
		"selected": $scope.selected,
		"id_partido": DetallePartidoService.partido.id
	}

	$scope.mandarInvitaciones = function() {
	 	$ionicLoading.show()

		ajax
			.mandarInvitaciones($scope.data)
			.then(function(resp) {
				$ionicLoading.hide()
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
			})
		
	}

}])

.factory('ajax', [ '$http', 'ajaxFunctions', '$rootScope', function($http, ajaxFunctions, $rootScope) {            
        
    return {

            homeData: '',

            detallePartido: '',

            jugadoresDeEmergencia: '',

            mandarInvitaciones: '',

            cargarHome: function() {
                console.log('va a realizar el pedido de inicializacion')
                if(!this.homeData) {
                    this.homeData = ajaxFunctions.realizarPedidoAjax(
                        { method:'POST', data: {"id": 1}, url: $rootScope.host + 'inicializacion' }
                    );
                }
                return this.homeData;
            },

            detallePartido: function(id) {
                console.log('va a realizar el pedido de detalle de busqueda')
                var detallePartido = ajaxFunctions.realizarPedidoAjax(
                    { method:'post', data: {"id": id}, url: $rootScope.host + 'detallePartido' }
                );
                return detallePartido;
            },

            buscarJugadorDeEmergencia: function(handicup) {
                console.log('va a realizar el pedido del detalle')
                this.jugadoresDeEmergencia = ajaxFunctions.realizarPedidoAjax(
                    { method:'post', data: {"handicup": handicup}, url: $rootScope.host + 'buscarJugadorDeEmergencia' }
                );
                return this.jugadoresDeEmergencia;
            },

            mandarInvitaciones: function(data) {
                console.log('va a realizar el pedido del detalle')
                this.mandarInvitaciones = ajaxFunctions.realizarPedidoAjax(
                    { method:'post', data: data, url: $rootScope.host + 'mandarInvitaciones' }
                );
                return this.mandarInvitaciones;
            }

        };

    }])
 ;