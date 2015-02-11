(function() {
    'use strict';

    angular.module('app').directive('contextualGlossary', function () {
        return {
            restrict: 'AE',
            templateUrl: 'app/components/reader/directives/contextualGlossary/contextualGlossary.html',
            transclude: true,
            link: function (scope) {
                scope.glossaryOpen = false;
                scope.closeClicked = function () {
                    scope.close();
                };
                scope.sectionClick = function (sectionId) {
                    scope.sectionSelected({
                        sectionId: sectionId
                    });
                    scope.close();
                };
                scope.glossaryClick = function () {
                    scope.showGlossary();
                    scope.close();
                };
                scope.coverClick = function () {
                    scope.showCover();
                    scope.close();
                };
                scope.jacketClick = function () {
                    scope.showJacket();
                    scope.close();
                };
            },
            scope: {
                close: '&onClose',
                showCover: '&onShowCover',
                showJacket: '&onShowJacket',
                showGlossary: '&onShowGlossary',
                sectionSelected: '&onSectionSelected',
                glossaryOpen: '=',
                coverOpen: '=',
                jacketOpen: '=',
                sectionId: '=',
                book: '='
            }
        };
    });

})();