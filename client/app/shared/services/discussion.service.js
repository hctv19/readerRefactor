(function () {
    'use strict';

    function discussionService(config, $resource) {
        var discussionApi = $resource(config.API_URL + 'api/discussions/:discussionId'),
            commentsApi = $resource(config.API_URL + 'api/discussions/:discussionId/comments');

        var service = {
            getDiscussion: getDiscussion,
            createDiscussion: createDiscussion
        };
        return service;

        function getDiscussion(bookId, paragraphId, callback) {
            discussionApi.get({ bookId: bookId, paragraphId: paragraphId }, callback);
        }

        function createDiscussion(name, bookId, sectionId, callback) {
            var newDiscussion = new { name: name, bookId: bookId, bookSectionId: sectionId }
            discussionApi.save(newDiscussion, callback);
        }
    }

    angular.module('app').factory('discussionService', discussionService);
}());
