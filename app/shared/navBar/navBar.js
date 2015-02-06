(function() {
    'use strict';

    function navbar() {
        var directive = {
            link: link,
            templateUrl: 'shared/navBar/navBar_tmpl.html',
            restrict: 'EA',
            scope: {
                title: '='
            },
            controller: NavbarController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
            console.log("Scope of NavBar: ", scope);
        }
    }

    function NavbarController() {
        var vm = this;
    }
    angular.module('app').directive('lqNavbar', navbar);
})();