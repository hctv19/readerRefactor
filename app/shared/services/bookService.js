'use strict';
(function () {
    var BookService = function (AppConfig, $resource, $http) {

        var bookCache = {};

        var BookResource = $resource(
            AppConfig.API_URL + '/api/books/:id/:action',
            {
                id: '@id',
                action: '@action'
            },
            {
                update: { method: 'PUT' },
                'query': { method: 'GET', isArray: true },
                getVerbose: { method: 'GET', isArray: true, params: { verbose: true } },
            }
        );

        var BookContentResource = $resource(
            AppConfig.API_URL + '/api/books/:id/content/:contentVersion/:verb',
            {
                id: '@id',
                verb: '@verb',
                contentVersion: '@contentVersion'
            },
            {
                'query': { method: 'GET', isArray: true },
                'publish': { method: 'POST' }
            }
        );

        var BookGlossaryResource = $resource(
            AppConfig.API_URL + '/api/books/:id/glossary/:contentVersion/:verb',
            {
                id: '@id',
                verb: '@verb',
                contentVersion: '@contentVersion'
            },
            {
                'query': { method: 'GET', isArray: true }
            }
        );


        var BookUserPreferenceResource = $resource(
            AppConfig.API_URL + '/api/books/:id/prefs',
            {   id: '@id' },
            {
                'save': { method: 'POST' }
            }
        );

        return {
            getBook: function(bookId, callback) {
                if (!bookCache[bookId]) {
                    BookResource.get({ id: bookId }, function(results) {
                        bookCache[bookId] = results;
                        callback(results);
                    });
                } else {
                    callback(bookCache[bookId]);
                }
            },
            getBooks: function(params, callback) {
                var books = BookResource.query(params, function() {
                    callback(books);
                });
            },
            getSectionContent: function (bookId, sectionIndex, callback) {
                BookContentResource.get({ id: bookId, sectionIndex: sectionIndex }, function (data) {
                    callback(data);
                });
            },
            getGlossary: function(bookId, callback) {
                BookGlossaryResource.query({ id: bookId }, function(results) {
                    callback(results);
                });
            },
            getBookUserPreferences: function (bookId, callback) {
                BookUserPreferenceResource.get({ id: bookId }, function (results) {
                    callback(results);
                });
            },
            updateBookUserPreferences: function (bookId, prefs, callback) {
                prefs.$save({ id: bookId }, function (results) {
                    callback(results);
                });
            }
        };
    };
    angular.module('app').factory('Book', ['AppConfig', '$resource','$http', BookService]);
}());
