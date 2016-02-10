(function () {
    'use strict';

    function auth($http, $q, identity, authorization, baseServiceUrl) {

        return {
            signup: function (user) {
                var deferred = $q.defer();

                $http.post('/register', user)
                    .then(function () {
                        deferred.resolve();
                    }, function (response) {
                        var error = response.data.modelState;
                        if (error && error[Object.keys(error)[0]][0]) {
                            error = error[Object.keys(error)[0]][0];
                        }
                        else {
                            error = response.data.message;
                        }

                        deferred.reject(error);
                    });

                return deferred.promise;
            },
            login: function (user) {
                var deferred = $q.defer();
                var data = new FormData();
                data.append('username', user.email);
                data.append('password', user.password);
                $http.post('/login', {username: user.email, password: user.password})
                    .then(function (response) {
                        if (response.data) {
                            console.log(response.data);
                            // identity.setCurrentUser(response.data);
                            deferred.resolve(response.data);
                        }
                        else {
                            deferred.resolve(false);
                        }
                    });

                return deferred.promise;
            },
            logout: function () {
                var deferred = $q.defer();

                var headers = authorization.getAuthorizationHeader();
                $http.get('/logout')
                    .then(function () {
                        identity.setCurrentUser(null);
                        deferred.resolve();
                    });

                return deferred.promise;
            },
            isAuthenticated: function () {
                if (identity.isAuthenticated()) {
                    return true;
                }
                else {
                    return $q.reject('not authorized');
                }
            }
        }
    }

    angular.module('myApp.services')
        .factory('auth', ['$http', '$q', 'identity', 'authorization', 'baseServiceUrl', auth]);
}());
