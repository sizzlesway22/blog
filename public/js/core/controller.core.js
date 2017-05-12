(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    function HomeController($http, myService, myFactory, userFactory) {
        var vm = this;
        vm.message = 'controllers are awesome';
    };

})();