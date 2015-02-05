(function () {
    'use strict';

    angular.module('app')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise(function($injector, $location) {
                console.log('Window.location was ' + window.location);
                if ($location.$$path.indexOf('access_token') !== -1) {
                    var tokenData = {};
                    var path = $location.path();
                    var query = path.substring(1);
                    var vars = query.split('&');
                    for (var i = 0; i < vars.length; i++) {
                        var pair = vars[i].split('=');
                        tokenData[pair[0]] = pair[1];
                    }
                    var expirationDate = new Date();
                    expirationDate.setSeconds(expirationDate.getSeconds() + tokenData.expires_in);
                    localStorage.auth_data = JSON.stringify(
                    {
                        'bearerToken': tokenData.access_token,
                        'expirationDate': expirationDate,
                        'externalLogin': true
                    });

                }
                var homePath = window.location.origin + '/#/library';
                console.log('Redirecting to library: ' + homePath);
                window.location = homePath;
            });

            $stateProvider
                .state('library', {
                    url: '/library',
                    templateUrl: 'views/library.html'
                })
                .state('reader', {
                    url: '/reader/:bookId/:sectionId',
                    templateUrl: 'views/reader.html',
                })
                .state('admin', {
                    url: '/admin',
                    abstract: true,
                    templateUrl: 'views/admin.html',
                })
                .state('admin.dashboard', {
                    url: '',
                    templateUrl: 'views/admin_views/dashboard.html',
                })
                .state('admin.accounts', {
                    url: '/accounts',
                    abstract: true,
                    templateUrl: 'views/admin_views/accounts.html',
                })
                .state('admin.accounts.list', {
                    url: '',
                    templateUrl: 'views/admin_views/accounts/list.html',
                })
                .state('admin.accounts.edit', {
                    url: '/:accountId',
                    templateUrl: 'views/admin_views/accounts/details.html',
                })
                .state('admin.books', {
                    url: '/books',
                    abstract: true,
                    templateUrl: 'views/admin_views/books.html',
                })
                .state('admin.books.list', {
                    url: '',
                    templateUrl: 'views/admin_views/books/list.html',
                })
                .state('admin.books.edit', {
                    url: '/:bookId',
                    templateUrl: 'views/admin_views/books/details.html',
                })
                .state('admin.authors', {
                    url: '/authors',
                    abstract: true,
                    templateUrl: 'views/admin_views/authors.html',
                })
                .state('admin.authors.list', {
                    url: '',
                    templateUrl: 'views/admin_views/authors/list.html',
                })
                .state('admin.authors.edit', {
                    url: '/:authorId',
                    templateUrl: 'views/admin_views/authors/details.html',
                });
        });
})();
