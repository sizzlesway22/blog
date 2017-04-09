(function() {
    'use strict';

    angular
        .module('app.core')
        .service('myService', testService);

    function testService() {
        this.sayHello = function(text) {
            return "Service says \"Hello " + text + "\"";
        };
    }

})();