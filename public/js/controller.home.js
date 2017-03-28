(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('HomeController', HomeController);

    function HomeController(myService, myFactory) {
        var vm = this;
        vm.message = 'controllers are awesome'
    };

})();