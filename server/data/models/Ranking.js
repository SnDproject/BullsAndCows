var mongoose = require('mongoose');

var requiredMessage = '{PATH} is required';

module.exports.init = function() {
    var rankingSchema = mongoose.Schema({
        //STATISTICS for Easy, Normal, Hard and eXpert
        _id: { type: String, default: 'globalStats'},
        eRanking: Array,
        nRanking: Array,
        hRanking: Array,
        xRanking: Array
    });

    var Ranking = mongoose.model('Ranking', rankingSchema);
};
