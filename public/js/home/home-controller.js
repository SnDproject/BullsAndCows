(function () {
    'use strict';

    function HomeController($location, data) {
        var vm = this;
        data.get('home')
            .then(function(data){
                vm.data = data;
            });

    }

    angular.module('myApp.controllers')
        .controller('HomeController', ['$location', 'data', HomeController])
}());
