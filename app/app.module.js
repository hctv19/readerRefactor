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

    var configData = {
        ver: '0.01',
        API_URL: 'https://liloqui-api.azurewebsites.net',
        //API_URL: 'http://localhost:57800',
        READER_URL: 'http://liloquitest.azurewebsites.net/#/'
    };

    angular
        .module('app', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ngTouch',
            'ui.router',
            'angularFileUpload'
        ])
        .constant('AppConfig', configData)
        .run(['$rootScope', function($rootScope) {
                $rootScope.styles = [];
                $rootScope.scripts = [];
            }
        ]);
})();