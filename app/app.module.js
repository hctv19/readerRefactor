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

    var config = {
        ver: '0.01',
        API_URL: 'https://liloqui-api.azurewebsites.net',
        //API_URL: 'http://localhost:57800',
        READER_URL: 'http://liloquitest.azurewebsites.net/#/'
    };

    angular
        .module('app', [
            'ngResource',
            'ngRoute',
            'ngSanitize'
        ])
        .constant('config', config)
        .run(['$rootScope', function($rootScope) {
                $rootScope.styles = [];
                $rootScope.scripts = [];
            }
        ]);
})();