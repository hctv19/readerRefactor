(function () {
    'use strict';

    function bookContent() {
        var directive = {
            link: link,
            templateUrl: 'components/reader/directives/bookContent/bookContent_tmpl.html',
            restrict: 'EA',
            controller: BookContentController,
            controllerAs: 'vm',
            scope: {
                content: '='
            },
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch('content', function () {
                console.log("Content has been set", scope.content);
            });

        }
    }

    function BookContentController() {
        var vm = this;
        console.log("BookContentController VM: ", vm);

    }
    angular.module('app').directive('lqBookContent', bookContent);
})();