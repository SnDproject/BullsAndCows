(function () {
    'use strict';

    function GameController($scope, $location, $route, $routeParams, gameService, statistics) {
        var vm = this;
        vm.progress = [];
        vm.currentGame = {};
        vm.time = undefined;
        vm.keyboard = [];
        vm.code = '';
        vm.submit = {
            disabled: true
        }

        gameService.newGame($routeParams.type)
            .then(function(data){
                vm.data = data;
                initiateKeyboard($routeParams.type);
            });


        function initiateKeyboard(type){
            var count = 10,
                i = 0,
                btn = {},
                extraDigits = ['a', 'b', 'c', 'd', 'e', 'f'];

            if(type == 2 || type == 3){
                count = 16
            }
            for(i =  0; i < count; i += 1){
                btn = {};
                btn.disabled = false;
                if(i < 10){
                    btn.value = i;
                } else {
                    btn.value = extraDigits[i - 10];
                }
                vm.keyboard.push(btn);
            }
        }

        //Relative Timer
        function startTimer(){
            vm.time = 0;
            setInterval(function(){
                if(vm.time !== undefined){
                    $scope.$apply(function(){
                        vm.time += 1;
                    })
                } else{
                    return;
                }
            }, 1000)
        }


        vm.newGame = function newGame(type){
            if($location.path() === '/game/' + type){
                $route.reload();
            } else{
                $location.path('/game/' + type);
            }

        }

        vm.guess = function(code){
            if(!vm.time){
                startTimer();
            }
            vm.clear();
            vm.submit.disabled = true;
            gameService.guessCode(code)
                .then(function(res){
                    //Win condition
                    if(res.moveCount){
                        console.log('VICTORY');
                        vm.time = undefined;
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


        //register code input
        vm.input = function input(val){
            var codeLength = 4;
            if($routeParams.type == 0){
                codeLength = 3;
            }
            if($routeParams.type == 3){
                codeLength = 5;
            }

            vm.keyboard.map(function(key){
                if(key.value == val){
                    key.disabled = true;
                    vm.code += val;
                    return
                }
            })
            // input validation
            if(vm.code.length == codeLength){
                vm.submit.disabled = false;
                vm.keyboard.map(function(key){
                    key.disabled = true;
                })
            }
        }

        //resets the keyboard and clears current code
        vm.clear = function clear(){
            vm.code = '';
            vm.submit.disabled = true;
            vm.keyboard.map(function(key){
                key.disabled = false;
            })
        }

        statistics.getStats($routeParams.type)
            .then(function(stats){
                console.log(stats);
                vm.stats = stats;
            })



    }

    angular.module('myApp.controllers')
        .controller('GameController', ['$scope', '$location', '$route', '$routeParams', 'gameService', 'statistics', GameController])
}());
