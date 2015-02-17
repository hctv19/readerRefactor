(function () {
    'use strict';

    function bookContent() {
        var directive = {
            link: link,
            template: '<section id="lqBookContentHtml"></section>',
            restrict: 'EA',
            scope: {
                content: '=',
                termClicked: '&termClicked'
            },
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch('content.html', function (newValue, oldValue) {
                if (newValue) {
                    $('#lqBookContentHtml mark').off('click');
                    $('#lqBookContentHtml').html(newValue);
                    $('#lqBookContentHtml mark').on('click', { scope: scope }, lookupTerm);
                }
            }, true);
        }

        function lookupTerm(e) {
            var scope = e.data.scope,
                $element = $(e.target),
                term = $element.attr('data-term'),
                context = $element.attr('data-context');
            scope.termClicked({ term: term, context: context });
            scope.$apply();
        }
    }

    angular.module('app').directive('lqBookContent', bookContent);
})();