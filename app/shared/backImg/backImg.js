(function() {
    'use strict';

    function backImg() {
        return function (scope, element, attrs) {
            var url = attrs.backImg;
            element.css({
                'background-image': 'url(' + url + ')',
                'background-size': 'cover'
            });
        };
    }

    angular.module('app').directive('backImg', backImg);
})();

