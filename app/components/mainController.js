(function () {
    'use strict';

    var Main = function (config, $rootScope, $scope) {
        var vm = this;
        vm.state = { leftMenuOpen: false };

        $scope.$on('book-menu.toggle', function() {
            vm.state.leftMenuOpen = !vm.state.leftMenuOpen;
        });

    };

    angular.module('app').controller('Main', Main);
}());