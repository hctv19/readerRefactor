(function () {
    'use strict';

    var Reader = function (config, bookService, $rootScope) {
        var vm = this;
        vm.book = { title: 'The Derpiest Dog' };
        console.log("Vm set", vm);
        //Methods
        vm.init = function () {

        };
    };

    angular.module('app').controller('Reader', Reader);
}());