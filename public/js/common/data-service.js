(function () {
    'use strict';
    var SERVER_URL;
    function data($http, $q, $location, authorization, notifier, baseServiceUrl) {

        SERVER_URL = $location.protocol() + "://" + $location.host() + ":" + $location.port();


        function get(url, queryParams) {
            var defered = $q.defer();

            var authHeader = authorization.getAuthorizationHeader();

            $http.get(SERVER_URL + '/' + url, { params: queryParams, headers: authHeader })
                .then(function (response) {
                    if(response.data.error){
                        notifier.error(response.data.error);
                        defered.reject(response.data.error);
                        return;
                    }
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    notifier.error(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function post(url, postData) {
            var defered = $q.defer();

            //var authHeader = authorization.getAuthorizationHeader();
            console.log(postData);
            $http.post(SERVER_URL + '/' + url, postData)
                .then(function (response) {
                    if(response.data.error){
                        notifier.error(response.data.error);
                        defered.reject(response.data.error);
                        return;
                    }
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    notifier.error(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function put(putData, url) {
            var defered = $q.defer();

            var authHeader = authorization.getAuthorizationHeader();

            $http.put(SERVER_URL + '/' + url, putData, { headers: authHeader })
                .then(function (response) {
                    if(response.data.error){
                        notifier.error(response.data.error);
                        defered.reject(response.data.error);
                        return;
                    }
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    notifier.error(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function getErrorMessage(response) {
            var error = response.data.modelState;
            if (error && error[Object.keys(error)[0]][0]) {
                error = error[Object.keys(error)[0]][0];
            }
            else {
                error = response.data.message;
            }

            return error;
        }

        return {
            get: get,
            post: post,
            put: put
        };
    }

    angular.module('myApp.services')
        .factory('data', ['$http', '$q', '$location', 'authorization', 'notifier', 'baseServiceUrl', data]);
}());
