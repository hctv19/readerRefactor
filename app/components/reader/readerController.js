(function () {
    'use strict';

    var Reader = function (config, bookService, $rootScope) {
        var vm = this;
        vm.book = { title: 'The Derpiest Dog' };
        console.log("Vm set", vm);
        //Methods
        vm.init = function () {

        };
        bookService.getBooks({}, function(books) {
            console.log("Books: ", books);
        });
    };

    angular.module('app').controller('Reader', Reader);
}());