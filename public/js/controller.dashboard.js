(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController($http, myService, myFactory) {
        var vm = this;
        vm.message = 'this is your dashboard, using a controller';

        vm.getUsers = function() {
            vm.message = 'not done yet';
        };

        vm.register = function() {
            $http.post('/register', {username:vm.username, password:vm.password})
            .then(function(response) {
                vm.message = 'you registered';
            }, function(response) {
                alert(response);
            })
        };
    };

})();