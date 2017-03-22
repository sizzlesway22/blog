(function() {
    'use strict';

    angular
        .module('app.core', []);

})();

/*
 * recommend
 * Using function declarations
 * and bindable members up top.
 * 
function AvengersController(avengersService, logger) {
    var vm = this;
    vm.avengers = [];
    vm.getAvengers = getAvengers;
    vm.title = 'Avengers';

    activate();

    function activate() {
        return getAvengers().then(function() {
            logger.info('Activated Avengers View');
        });
    }

    function getAvengers() {
        return avengersService.getAvengers().then(function(data) {
            vm.avengers = data;
            return vm.avengers;
        });
    }
}







*/