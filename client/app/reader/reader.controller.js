(function () {
    'use strict';

    var Reader = function (config, bookService, $scope) {
        var vm = this;
        vm.book = { name: 'The Derpiest Dog'};
        $scope.bookContent = {html: ''}; //Binding to this when it's vm.bookContent doesn't update. Why?
        vm.state = { bookMenuOpen: false, contextualGlossaryOpen: false };

        vm.bookMenuClicked = function () {
            vm.state.bookMenuOpen = !vm.state.bookMenuOpen;
        };

        vm.glossaryTermClicked = function() {
            vm.state.contextualGlossaryOpen = !vm.state.contextualGlossaryOpen;
        };

        bookService.getBooks({}, function(books) {
            getBook(books[0].id, function (book) {
                vm.book = book;
                getBookContent(vm.book.id, vm.book.sections[0].index);
            });
        });

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