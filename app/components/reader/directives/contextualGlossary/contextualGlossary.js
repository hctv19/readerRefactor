﻿(function () {
    'use strict';

    function conextualGlossary() {
        var directive = {
            link: link,
            templateUrl: 'components/reader/directives/contextualGlossary/contextualGlossary_tmpl.html',
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
            console.log("Scope of ContextualGlossary: ", scope);
        }
    }

    function GlossaryController() {
        var vm = this;
    }
    angular.module('app').directive('lqContextualGlossary', conextualGlossary);
})();