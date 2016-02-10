(function () {
    'use strict';

    var user = null;

    function LoginController($scope, $location, notifier, identity, auth) {
        $scope.identity = identity;

        $scope.login = function (user, loginForm) {
            if (loginForm.$valid) {
                auth.login(user).then(function (success) {
                    if (success) {
                        identity.setCurrentUser(success);
                        console.log('From identity GET' + identity.getCurrentUser().email);
                        notifier.success('Successful login!');
                        $location.path('/home');
                    }
                    else {
                        notifier.error('Username/Password combination is not valid!');
                    }
                });
            }
            else {
                notifier.error('Username and password are required fields!')
            }
        }

        $scope.logout = function () {
            auth.logout().then(function () {
                notifier.success('Successful logout!');
                $location.path('/');
            })
        }
    }

    angular.module('myApp.controllers')
        .controller('LoginCtrl', ['$scope', '$location', 'notifier', 'identity', 'auth', LoginController]);
}());
