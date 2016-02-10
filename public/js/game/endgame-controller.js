(function () {
    'use strict';

    function EndgameController($location, $routeParams, gameService, statistics) {
        var vm = this;
        vm.progress = [];

        vm.currentGame = {
            type: $routeParams.type,
            moves: $routeParams.moves,
            time: $routeParams.time
        };

        statistics.getStats($routeParams.type)
            .then(function(stats){
                console.log(stats);
                vm.stats = stats;
            })

        statistics.getRanking($routeParams.type)
            .then(function(ranking){
                console.log(ranking);
                vm.ranking = ranking.data;
            })
    }

    angular.module('myApp.controllers')
        .controller('EndgameController', ['$location', '$routeParams', 'gameService', 'statistics', EndgameController])
}());
