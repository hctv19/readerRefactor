(function () {
    'use strict';

    var Reader = function (config, bookService, $scope) {
        var vm = this;

        vm.book = { name: 'The Derpiest Dog' };
        vm.bookMenuOpen = false;
        vm.contextualGlossaryOpen = false; 
        vm.bookMenuClicked = bookMenuClicked;

        $scope.bookContent = { html: '' }; //Binding to this when it's vm.bookContent doesn't update. Why?


        vm.glossaryTermClicked = function() {
            vm.contextualGlossaryOpen = !vm.contextualGlossaryOpen;
        };

        bookService.getBooks({}, function(books) {
            getBook(books[0].id, function (book) {
                vm.book = book;
                getBookContent(vm.book.id, vm.book.sections[0].index);
            });
        });

        function bookMenuClicked() {
            vm.bookMenuOpen = !vm.bookMenuOpen;
        }

        function getBook(bookId, callback) {
            bookService.getBook(bookId, callback);
        }

        function getBookContent(bookId, sectionIndex) {
            bookService.getSectionContent(bookId, sectionIndex, function (content) {
                $scope.bookContent.html = content.html;
            });
        }
    };

    angular.module('app').controller('Reader', Reader);
}());