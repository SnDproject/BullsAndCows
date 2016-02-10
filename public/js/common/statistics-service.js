(function() {
    'use strict';

    function statistics($q, data) {

        function getStats(type) {
            return data.get('stats/globalstats/' + type)
                .then(function (stats) {
                    return stats;
                });
        }

        function getRanking(type){
            return data.get('stats/ranking/' + type)
                .then(function (ranking) {
                    return ranking;
                });
        }

        return {
            getStats: getStats,
            getRanking: getRanking
        }
    }

    angular.module('myApp.services')
        .factory('statistics', ['$q', 'data', statistics]);
}());
