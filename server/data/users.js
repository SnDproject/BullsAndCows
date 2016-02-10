(function(){
    'use strict';
    var User = require('mongoose').model('User');

    function createUser(user, callback){
        User.create(user, callback);
    }

    function updateBest(email, type, moves, time){
        User
            .findOne({email : email}, function(err, user){
                if(err) return err;

                var newBest = {
                    moves: moves,
                    time: time
                };

                //update high score:
                user.best.splice(type, 1, newBest);


                //save user data
                user.save(function(err){
                    if(err){
                        console.log('error updating new best');
                        return err;
                    }
                    console.log('Best score for ' + user.email + ' updated');
                });
            });
    }

    function updateStats(email, type, moves, time, callback){
        User
            .findOne({email : email}, function(err, user){
                if(err) return err;
                //update statistics:
                var newStats = {
                    gamesCount: user.stats[type].gamesCount + 1,
                    totalMoves: user.stats[type].totalMoves + moves,
                    totalTime: user.stats[type].totalTime + time
                };
                user.stats.splice(type, 1, newStats);
                //save user data
                user.save(function(err){
                    if(err) return err;
                    console.log('Statistict for user ' + user.email + ' updated');
                    callback();
                });
            });
    }

    module.exports = {
        create: createUser,
        updateBest: updateBest,
        updateStats: updateStats
    };
}());


