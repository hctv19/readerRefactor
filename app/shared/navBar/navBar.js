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
            
        }
    }

    function NavbarController() {
        var vm = this;
    }
    angular.module('app').directive('lqNavbar', navbar);
})();