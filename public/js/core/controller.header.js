(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('HeaderController', HeaderController);

    function HeaderController() {
        var vm = this;
        vm.loggedin = false;
    };

})();