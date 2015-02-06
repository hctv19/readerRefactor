(function () {
    'use strict';

    var Reader = function (config, bookService, $rootScope) {
        var vm = this;
        vm.book = { title: 'The Derpiest Dog' };

        //Methods
        vm.init = function () {

        };
    };

    angular.module('app').controller('Reader', Reader);
}());