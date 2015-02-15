(function() {
    'use strict';

    function navbar() {
        var directive = {
            link: link,
            templateUrl: 'shared/navBar/navBar_tmpl.html',
            restrict: 'EA',
            controller: NavbarController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
            console.log("Scope of NavBar: ", scope);
        }
    }

    function NavbarController($scope) {
        var vm = this;
        vm.bookMenuClicked = function () {
            $scope.$emit('book-menu.toggle');
        };
    }
    angular.module('app').directive('lqNavbar', navbar);
})();