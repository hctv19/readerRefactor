(function () {
    'use strict';

    function glossary() {
        var directive = {
            link: link,
            templateUrl: 'components/reader/directives/glossary/glossary_tmpl.html',
            restrict: 'EA',
            scope: {
                title: '='
            },
            controller: GlossaryController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
            console.log("Scope of Glossary: ", scope);
        }
    }

    function GlossaryController() {
        var vm = this;
    }
    angular.module('app').directive('lqGlossary', glossary);
})();