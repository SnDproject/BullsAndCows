(function () {
    'use strict';

    function config($routeProvider) {

        var PARTIALS_PREFIX = 'views/partials/';
        var CONTROLLER_AS_VIEW_MODEL = 'vm';

        $routeProvider
            .when('/home', {
                templateUrl: PARTIALS_PREFIX + 'home/home.html',
                controller: 'HomeController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/unauthorized', {
                template: '<h1 class="text-center">YOU ARE NOT AUTHORIZED!</h1>'
            })
            .when('/game/:type', {
                templateUrl: PARTIALS_PREFIX + 'game/game.html',
                controller: 'GameController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/endgame/:moves/:time/:type', {
                templateUrl: PARTIALS_PREFIX + 'game/endGame.html',
                controller: 'EndgameController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/howto', {
                templateUrl: PARTIALS_PREFIX + 'howTo/howTo.html'
            })
            .when('/register', {
                templateUrl: PARTIALS_PREFIX + 'identity/register.html',
                controller: 'SignUpCtrl'
            })
            .when('/login', {
                templateUrl: PARTIALS_PREFIX + 'identity/login.html',
                controller: 'LoginCtrl'
            })
            .otherwise({ redirectTo: '/home' });
    }

    angular.module('myApp.services', []);
    angular.module('myApp.directives', []);
    angular.module('myApp.filters', []);
    angular.module('myApp.controllers', ['myApp.services']);
    angular.module('myApp', ['ngRoute', 'ngSanitize', 'ngCookies', 'ngStorage', 'myApp.controllers', 'myApp.directives', 'myApp.filters']).
        config(['$routeProvider', config])
        .value('toastr', toastr)
        .constant('baseServiceUrl', '/');
}());
