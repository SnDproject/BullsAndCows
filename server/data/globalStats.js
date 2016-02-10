(function(){
    'use strict';
    var GlobalStats = require('mongoose').model('GlobalStats'),
        constants = require('../common/constants');


    module.exports = {
        //Updates global statistics for a single game type where:
        // type => [0, 1, 2, 3]
        // moves => positive Integer
        // time => positive integer (seconds)
        update: function(type, moves, time){
            GlobalStats
                .findOne({_id : 'globalStats'}, function(err, stats){
                    var gameType = constants.gameCodes[type] + 'Stats';
                    var data = {
                        gamesCount: stats[gameType].gamesCount + 1,
                        totalMoves: stats[gameType].totalMoves + moves,
                        totalTime: stats[gameType].totalTime + time
                    };

                    stats[gameType] = data;

                    stats.save(function(err){
                        console.log(err);
                        return err;
                    });
                });
        },
        //Returns the global stats where
        get: function(type, callback){
                GlobalStats
                    .findOne({_id : 'globalStats'}, function(err, stats){
                        var gameType = constants.gameCodes[type] + 'Stats',
                            data = {};
                        if (err){
                            callback(err);
                        } else {
                            data = {
                                data: stats[gameType]
                            }
                            callback(err, data);
                        }

                    });
            }

    };
}());
