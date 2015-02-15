(function () {
    'use strict';
    angular.module('app')
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
        .when('/reader', {
            templateUrl: 'components/reader/reader.html',
            controller: 'Reader',
            controllerAs: 'reader'
        })
        .when('/reader/:bookId', {
            templateUrl: 'app/reader/reader.html',
            controller: 'Reader',
            controllerAs: 'reader'
        })
        .otherwise({ redirectTo: '/reader' });

        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(false);
    });
})();
