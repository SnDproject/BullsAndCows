(function() {
    'use strict';

    function keyboard() {
        return {
            restrict: 'A',
            templateUrl: 'views/directives/keyboard-directive.html',
            scope: {
                size: '@'
            }
        }
    }

    angular.module('myApp.directives')
        .directive('bnc-keyboard', [keyboard]);
}());
