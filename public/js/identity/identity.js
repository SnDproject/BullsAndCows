(function () {
    'use strict';

    function identity($localStorage) {
        var cookieStorageUserKey = 'currentApplicationUser';

        return {
            getCurrentUser: function () {
                if($localStorage.user){
                    return JSON.parse($localStorage.user);
                } else {
                    return false;
                }
            },
            setCurrentUser: function (user) {
                if (user) {
                    console.log('From identity SET ' + user);
                    $localStorage.$default({
                        user: JSON.stringify(user)
                    })
                }
                else {
                    $localStorage.$reset();
                }

            },
            isAuthenticated: function () {
                return !!this.getCurrentUser();
            }
        }
    }

    angular.module('myApp.services').factory('identity', ['$localStorage', identity]);
}());
