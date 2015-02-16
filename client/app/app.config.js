(function() {
    'use strict';

    var config = {
        ver: '0.01',
        API_URL: 'https://liloqui-api.azurewebsites.net',
        //API_URL: 'http://localhost:57800',
        READER_URL: 'http://liloquitest.azurewebsites.net/#/'
    };

    angular
        .module('app')
        .constant('config', config);
})();