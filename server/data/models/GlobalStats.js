var mongoose = require('mongoose');

var requiredMessage = '{PATH} is required';

module.exports.init = function() {
    var globalStatsSchema = mongoose.Schema({
        //STATISTICS for Easy, Normal, Hard and eXpert
        _id: { type: String, default: 'globalStats'},
        eStats: { type: Object, default: {gamesCount: 0, totalMoves: 0, totalTime: 0}},
        nStats: { type: Object, default: {gamesCount: 0, totalMoves: 0, totalTime: 0}},
        hStats: { type: Object, default: {gamesCount: 0, totalMoves: 0, totalTime: 0}},
        xStats: { type: Object, default: {gamesCount: 0, totalMoves: 0, totalTime: 0}}
    });

    var GlobalStats = mongoose.model('GlobalStats', globalStatsSchema);
};
