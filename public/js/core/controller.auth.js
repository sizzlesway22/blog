(function() {
    'use strict';

    angular
        .module('app')
        .controller('AuthController', AuthController);

    function AuthController($http, $location, myService, myFactory, userFactory) {
        var vm = this;
        vm.message = 'controllers are awesome';

        vm.login = function() {
            userFactory.login({email:vm.email, password:vm.password})
            .then(function(response) {
                console.log(response.data);
                myService.setId(response.data);
                $location.path('dashboard');
            }, function(response) {
                vm.message = "couldn't log you in, sorry";
            });
        }

        vm.register = function() {
            userFactory.register({email:vm.email, name:vm.name, password:vm.password})
            .then(function(response) {
                console.log(response.data);
                myService.setId(response.data);
                $location.path('dashboard');
            }, function(response) {
                vm.message = "couldn't register you, sorry";
            });
        };
    };

})();