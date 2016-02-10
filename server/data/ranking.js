(function(){
    'use strict';
    var Ranking = require('mongoose').model('Ranking'),
        constants = require('../common/constants');


    module.exports = {
        //Inserts new personal bests:
        // type => [0, 1, 2, 3]
        // moves => positive Integer
        // time => positive integer (seconds)
        insert: function(type, name, moves, time){
            Ranking
                .findOne({_id : 'ranking'}, function(err, ranking){
                    var gameType = constants.gameCodes[type] + 'Ranking';
                    //Delete current position
                    ranking[gameType].map(function(item, index, array){
                        if(item.name && item.name === name){
                            array.splice(index, 1);
                            return;
                        }
                    });
                    //Insert the new score member
                    ranking[gameType].push({
                        name: name,
                        moves: moves,
                        time: time
                    });
                    //Sort the ranking
                    ranking[gameType].sort(function(a, b){
                        if(a.moves > b.moves){
                            return 1;
                        }
                        if(a.moves < b.moves){
                            return -1;
                        }
                        if(a.time > b.time){
                            return 1;
                        }
                        if(a.time < b.time){
                            return -1;
                        }
                        return 0;
                    });

                    //Save

                    ranking.save(function(err){
                        if(err) return err;
                        console.log('Ranking update successful');
                    });
                });
        },
        //Returns the Ranking where
        get: function(type ,callback){
                Ranking
                    .findOne({_id : 'ranking'}, function(err, ranking){
                        var gameType = constants.gameCodes[type] + 'Ranking',
                            data = {};
                        if (err){
                            callback(err);
                        } else {
                            data = {
                                data: ranking[gameType]
                            }
                            callback(err, data);
                        }

                    });
            }

    };
}());
