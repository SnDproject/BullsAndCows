(function() {
    'use strict';

    function publicProjects() {
        return {
            restrict: 'A',
            templateUrl: 'views/directives/public-projects-directive.html'
        }
    }

    angular.module('myApp.directives')
        .directive('publicProjects', [publicProjects]);
}());
