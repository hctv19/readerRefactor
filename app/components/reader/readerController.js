(function () {
    'use strict';

    var Reader = function (config, bookService, $scope, $sce) {
        var vm = this;
        vm.book = { name: 'The Derpiest Dog' };
        vm.bookContent = {};
        vm.state = { bookMenuOpen: false, contextualGlossaryOpen: false };

        $scope.$on('book-menu.toggle', function() {
            vm.state.bookMenuOpen = !vm.state.bookMenuOpen;
        });

        $scope.$on('contextual-glossary.toggle', function () {
            vm.state.contextualGlossaryOpen = !vm.state.contextualGlossaryOpen;
        });

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
                var trustedHtml = $sce.trustAsHtml(content.html);
                console.log("Trusted HTML: ", trustedHtml);
                vm.bookContent = trustedHtml;
            });
        }
    };

    angular.module('app').controller('Reader', Reader);
}());