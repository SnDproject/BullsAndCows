(function() {
    'use strict';

    function gameService(data) {


        function newGame(type) {
            return data.get('game/' + type);
        }

        function guessCode(code){
            //TODO
            return data.get('guess/' + code)
        }



        return {
            newGame: newGame,
            guessCode: guessCode
        }
    }

    angular.module('myApp.services')
        .factory('gameService', ['data', gameService]);
}());
