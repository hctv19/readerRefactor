﻿(function () {
    'use strict';

    function bookMenu() {
        var directive = {
            link: link,
            templateUrl: 'components/reader/directives/bookMenu/bookMenu_tmpl.html',
            restrict: 'EA',
            scope: {
                title: '='
            },
            controller: BookMenuController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
            console.log("Scope of BookMenu: ", scope);
        }
    }

    function BookMenuController() {
        var vm = this;
    }
    angular.module('app').directive('lqBookMenu', bookMenu);
})();