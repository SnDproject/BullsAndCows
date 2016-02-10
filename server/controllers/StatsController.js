(function(){
    'use strict';
    var stats = require('../data/globalStats'),
        ranking = require('../data/ranking');

    function getStatistics(req, res, next){
        stats.get(req.params.type, function(err, data){
            if(err) {
                res.json({error: 'Problem with loading the statistics!'});
            } else {
                res.json(data);
            }
        });
    }

    function getRanking(req, res, next){
        ranking.get(req.params.type, function(err, result){
            if(err){
                res.json({error: 'Problem with loading the ranking!'});
            } else {
                res.json(result);
            }
        });
    }

    module.exports = {
        getStatistics: getStatistics,
        getRanking: getRanking
    };

}());


