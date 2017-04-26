(function() {
    'use strict';

    angular
        .module('app.core')
        .service('myService', testService)
        .factory('myFactory', testFactory);

    function testService() {
        this.sayHello = function(text) {
            return "Service says \"Hello " + text + "\"";
        };
    };

    function testFactory() {
        return {
            sayGoodbye: function(text) {
                return "Factory says \"Goodbye " + text + "\"";
            }  
        } 
    };

})();