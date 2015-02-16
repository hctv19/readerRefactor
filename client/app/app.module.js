/**
 * @ngdoc overview
 * @name liloquilibraryApp
 * @description
 * # liloquilibraryApp
 *
 * Main module of the application.
 */

(function() {
    'use strict';

    angular
        .module('app', [
            'ngResource',
            'ui.router'
        ])
        .run(['$rootScope', function($rootScope) {
                $rootScope.styles = [];
                $rootScope.scripts = [];
            }
        ]);
})();