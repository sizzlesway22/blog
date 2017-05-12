(function() {
    'use strict';

    angular
        .module('app')
        .controller('AuthController', AuthController);

    function AuthController($http, myService, myFactory, userFactory) {
        var vm = this;
        vm.message = 'controllers are awesome';

        vm.login = function() {
            userFactory.login({username:vm.username, password:vm.password})
            .then(function(response) {
                vm.message = response.data;
            }, function(response) {
                vm.message = "couldn't log you in, sorry";
            });
        }

        vm.register = function() {
            userFactory.register({email:vm.email, name:vm.name, password:vm.password})
            .then(function(response) {
                vm.message = response.data;
            }, function(response) {
                vm.message = "couldn't register you, sorry";
            });
        };
    };

})();