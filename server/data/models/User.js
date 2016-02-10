var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption');

var requiredMessage = '{PATH} is required';

module.exports.init = function() {
    var userSchema = mongoose.Schema({
        salt: String,
        hashPass: String,
        email: { type: String, required: requiredMessage , unique: true},
        //HIGH SCORES
        best: {type: Array, default: [{moves: 10000, time: 10000},
                                      {moves: 10000, time: 10000},
                                      {moves: 10000, time: 10000},
                                      {moves: 10000, time: 10000}]},
        //STATISTICS
        stats: {type: Array, default: [{gamesCount: 0, totalMoves: 0, totalTime: 0},
                                       {gamesCount: 0, totalMoves: 0, totalTime: 0},
                                       {gamesCount: 0, totalMoves: 0, totalTime: 0},
                                       {gamesCount: 0, totalMoves: 0, totalTime: 0}]}
    });

    userSchema.method({
        authenticate: function(password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            }
            else {
                return false;
            }
        }
    });

    var User = mongoose.model('User', userSchema);
};


