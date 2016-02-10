(function () {
    'use strict';

    function GameController($location, $route, $routeParams, gameService, statistics) {
        var vm = this;
        vm.progress = [];
        vm.currentGame = {};

        gameService.newGame($routeParams.type)
            .then(function(data){
                vm.data = data;
            });


        vm.newGame = function newGame(type){
            if($location.path() === '/game/' + type){
                $route.reload();
            } else{
                $location.path('/game/' + type);
            }
        }

        vm.guess = function(code){
            gameService.guessCode(code)
                .then(function(res){
                    //Win condition
                    if(res.moveCount){
                        console.log('VICTORY');
                        var gameParams = res.moveCount + '/' +
                                         res.gameTime + '/' +
                                         vm.data.type
                        $location.path('/endgame/' + gameParams);
                    }
                    vm.progress.push({
                        code: code,
                        result: 'Bx' + res.bulls + ' Cx' + res.cows
                    });
                })
        }

        statistics.getStats($routeParams.type)
            .then(function(stats){
                console.log(stats);
                vm.stats = stats;
            })



    }

    angular.module('myApp.controllers')
        .controller('GameController', ['$location', '$route', '$routeParams', 'gameService', 'statistics', GameController])
}());
