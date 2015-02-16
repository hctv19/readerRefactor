(function () {
    'use strict';

    function bookService(config, $resource) {
        var bookCache = {},
            booksApi = $resource(config.API_URL + '/api/books/:bookId'),
            contentApi = $resource(config.API_URL + '/api/books/:bookId/content/:contentVersion'),
            glossaryApi = $resource(config.API_URL + '/api/books/:bookId/glossary/:contentVersion'),
            preferencesApi = $resource(config.API_URL + '/api/books/:bookId/prefs');

        var service = {
            getBook: getBook,
            getBooks: getBooks,
            getSectionContent: getSectionContent,
            getGlossary: getGlossary,
            getBookUserPreferences: getBookUserPreferences,
            updateBookUserPreferences: updateBookUserPreferences
        };
        return service;

        function getBook(bookId, callback) {
            booksApi.get({ bookId: bookId }, callback);
        }

        function getBooks(params, callback) {
            booksApi.query(params, callback);
        }

        function getSectionContent(bookId, sectionIndex, callback) {
            contentApi.get({ bookId: bookId, sectionIndex: sectionIndex }, callback);
        }

        function getGlossary(bookId, callback) {
            glossaryApi.query({ bookId: bookId }, callback);
        }

        function getBookUserPreferences(bookId, callback) {
            preferencesApi.get({ bookId: bookId }, callback);
        }

        function updateBookUserPreferences(bookId, prefs, callback) {
            prefs.$save({ bookId: bookId }, function (results) {
                callback(results);
            });
        }
    }

    angular.module('app').factory('bookService', bookService);

}());
