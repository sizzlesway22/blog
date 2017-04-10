(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    function HomeController($http, myService, myFactory) {
        var vm = this;
        vm.message = 'controllers are awesome';

        vm.login = function() {
            $http.post('/login', {username:vm.username, password:vm.password})
            .then(function(response) {
                vm.message = response.data;
            }, function(response) {
                vm.message = "couldn't log you in, sorry";
            });
        }

        vm.register = function() {
            $http.post('/register', {username:vm.username, password:vm.password})
            .then(function(response) {
                vm.message = response.data;
            }, function(response) {
                vm.message = "couldn't register you, sorry";
            });
        };
    };

})();