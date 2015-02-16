(function () {
    'use strict';

    function bookContent() {
        var directive = {
            link: link,
            templateUrl: 'components/reader/directives/bookContent/bookContent_tmpl.html',
            restrict: 'EA',
            scope: {
                content: '='
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

            scope.$emit('contextual-glossary.toggle', {term: term, context: context});
            scope.$apply();
        }
    }
    angular.module('app').directive('lqBookContent', bookContent);
})();