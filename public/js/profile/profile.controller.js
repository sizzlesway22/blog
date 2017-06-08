(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('ProfileController', ProfileController);

    function ProfileController($http, myService, userFactory) {
        var vm = this;
        vm.message = 'this is your profile controller';
    };

})();