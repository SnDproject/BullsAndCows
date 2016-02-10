'use strict';

var users = require('../data/users');
var games = require('../utilities/games');
var stats = require('../data/globalStats');
var ranking = require('../data/ranking');


module.exports = {
    newGame: function(req, res, next) {

        var newGame = games.createGame(parseInt(req.params.type));
        req.session.currentGame = newGame;
        res.json(newGame);
    },
    //Logic handling the incomming code candidates
    //Win condition / high score / statistics update
    guess: function(req, res, next) {
        if(!req.session.currentGame){
            res.json({error: 'Current game is no longer available. Please, start a new one'});
            return;
        }
        var currentGame = req.session.currentGame,
            result = {};
        //Check if time exceeds 30min
        //TODO

        //Compare codes
        try {
            result = games.compare(currentGame.code, req.params.code); // tries to compare codes
        }
        catch (err){
            console.log(err);
            req.session.error = err[0];
            res.json({error: 'There was a problem with solving your input. Please start a new game!'});
            return;
        }


        currentGame.moveCount +=1;

        //WIN CONDITION
        if(result.bulls === currentGame.code.length){

            //Updates global stats
            var endTime = new Date().getTime();
            var gameTime = (endTime - currentGame.startTime) / 1000;
            stats.update(currentGame.type, currentGame.moveCount, gameTime);

            //High Score and statistics:
            if(req.user){
                //logged in user present!
                //get current best:
                var best = req.user.best[currentGame.type];
                //Update statistics:
                users.updateStats(req.user.email, currentGame.type, currentGame.moveCount, gameTime, function(){
                    //check for high score and update:
                    if(best.moves > currentGame.moveCount ||
                       (best.moves == currentGame.moveCount && best.time > gameTime)){
                        //update best:
                        users.updateBest(req.user.email, currentGame.type, currentGame.moveCount, gameTime);
                        //update ranking:
                        ranking.insert(currentGame.type, req.user.email, currentGame.moveCount, gameTime);
                    }
                });


            } else {
                console.log('guest user!');
            }


            //adds full game data to the result:
            result.moveCount = currentGame.moveCount;
            result.gameTime = gameTime;
            //destroy the current game
            req.session.currentGame = {};
        } else{
            // returns the current game back in the session
            req.session.currentGame = currentGame;
        }

        //response
        res.json(result);
    }
};
