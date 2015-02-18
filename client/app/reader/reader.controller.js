(function () {
    'use strict';

    var Reader = function (config, bookService, $scope) {
        var vm = this;

        vm.book = { name: 'The Derpiest Dog' };
        vm.state = {
            bookMenuOpen: false,
            contextualGlossaryOpen: false,
            discussOpen: false
        };
        vm.discussionParagraphId = null;
        vm.bookMenuClicked = bookMenuClicked;
        vm.glossaryTermClicked = glossaryTermClicked;
        vm.closeContextualGlossary = closeContextualGlossary;
        vm.closeDiscussions = closeDiscussions;
        vm.discussClicked = discussClicked;

        $scope.bookContent = { html: '' }; //Binding to this when it's vm.bookContent doesn't update. Why?



        bookService.getBooks({}, function (books) {
            getBook(books[0].id, function (book) {
                vm.book = book;
                getBookContent(vm.book.id, vm.book.sections[0].index);
            });
        });

        function bookMenuClicked() {
            vm.state.bookMenuOpen = !vm.state.bookMenuOpen;
        }

        function glossaryTermClicked(term, context) {
            console.log("Term Clicked: " + term + " " + context);
            vm.state.contextualGlossaryOpen = !vm.state.contextualGlossaryOpen;
        }

        function discussClicked(paragraphId) {
            if (paragraphId !== vm.discussionParagraphId) {
                vm.discussionParagraphId = paragraphId;
                vm.state.discussOpen = true;
            } else {
                vm.state.discussOpen = !vm.state.discussOpen;
            }
        }

        function getBook(bookId, callback) {
            bookService.getBook(bookId, callback);
        }

        function getBookContent(bookId, sectionIndex) {
            bookService.getSectionContent(bookId, sectionIndex, function (content) {
                $scope.bookContent.html = content.html;
            });
        }

        function closeContextualGlossary() {
            vm.state.contextualGlossaryOpen = false;
        }

        function closeDiscussions() {
            vm.state.discussOpen = false;
        }
    };

    angular.module('app').controller('Reader', Reader);
}());