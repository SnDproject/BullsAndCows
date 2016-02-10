var mongoose = require('mongoose'),
    UserModel = require('../data/models/User'),
    GlobalStats = require('../data/models/GlobalStats'),
    Ranking = require('../data/models/Ranking'),
    encryption = require('../utilities/encryption');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...')
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    UserModel.init();
    GlobalStats.init();
    Ranking.init();




    //GENERATE INITIAL STATISTICS FIELD
    var gs = mongoose.model('GlobalStats');

    gs
        .findOne({_id : 'globalStats'}, function (err, stats) {
           if (err) {
                return err;
           } else if(!stats){
                var initialStats  = {
                    _id : 'globalStats',
                    eStats: {gamesCount: 0, totalMoves: 0, totalTime: 0},
                    nStats: {gamesCount: 0, totalMoves: 0, totalTime: 0},
                    hStats: {gamesCount: 0, totalMoves: 0, totalTime: 0},
                    xStats: {gamesCount: 0, totalMoves: 0, totalTime: 0}
                };
                gs.create(initialStats, function(err){
                    if (err){
                        console.log('Stats creation Error: ' + err);
                        return err;
                    } else {
                        console.log('Initial stats generated!');
                    }
                })
           }
        })
    //GENERATE INITIAL RANKING
    var ranks = mongoose.model('Ranking');
    ranks
        .findOne({_id : 'ranking'}, function (err, ranking) {
           if (err) {
                return err;
           } else if(!ranking){
                var initialRanking  = {
                    _id : 'ranking',
                    eRanking: [],
                    nRanking: [],
                    hRanking: [],
                    xRanking: []
                };
                ranks.create(initialRanking, function(err){
                    if (err){
                        console.log('Ranking generation Error: ' + err);
                        return err;
                    } else {
                        console.log('Initial ranking generated!');
                    }
                })
           }
        })
};
