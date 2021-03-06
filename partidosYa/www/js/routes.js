angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

  .state('menu.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.cart', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cart.html',
        controller: 'cartCtrl'
      }
    }
  })

  .state('menu.cloud', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cloud.html',
        controller: 'cloudCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/page4',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page5',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('menu.partidoNuevoDonde', {
    url: '/crearPartido/donde',
    views: {
      'side-menu21': {
        templateUrl: 'templates/partidoNuevoDonde.html',
        controller: 'partidoNuevoDondeCtrl'
      }
    }
  })

  .state('menu.partidoNuevoCuando', {
    url: '/crearPartido/cuando',
    views: {
      'side-menu21': {
        templateUrl: 'templates/partidoNuevoCuando.html',
        controller: 'partidoNuevoCuandoCtrl'
      }
    }
  })

  .state('menu.partidoNuevoInvitarAmigos', {
    url: '/crearPartido/amigos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/partidoNuevoInvitarAmigos.html',
        controller: 'partidoNuevoInvitarAmigosCtrl'
      }
    }
  })

  .state('menu.detallePartido', {
    url: '/detallePartido',
    views: {
      'side-menu21': {
        templateUrl: 'templates/partido.html',
        controller: 'partidoCtrl'
      }
    }
  })

  .state('menu.elegirJugadores', {
    url: '/elegirJugadores',
    views: {
      'side-menu21': {
        templateUrl: 'templates/elegiATusJugadores.html',
        controller: 'elegiATusJugadoresCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page1')


});