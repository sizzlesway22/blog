(function() {
    'use strict';

    angular
        .module('app', ['app.core', 'app.dashboard', 'app.profile'])
        .controller('HomeController', HomeController);

    function HomeController($http, myService, myFactory, userFactory) {
        var vm = this;
        vm.user = userFactory.me();
        vm.loggedin = false;
        
        vm.greeting = function() {
            if (!vm.user._id) {
                vm.message = 'Hello';
            } else {
                vm.message = 'Welcome back ' + vm.user.name;
            };
        };

        vm.greeting();
    };

})();