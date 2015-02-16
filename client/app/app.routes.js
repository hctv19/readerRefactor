(function () {
    'use strict';
    angular.module('app')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/reader');

        $stateProvider
            .state('reader', {
                url: '/reader/:bookId',
                templateUrl: 'app/reader/reader.html',
            });
    });
})();
