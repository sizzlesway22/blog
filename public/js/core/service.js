(function() {
    'use strict';

    angular
        .module('app.core')
        .service('myService', userService)
        .factory('myFactory', testFactory);

    function userService($http) {
        var userId;

        return {
            getId: getId,
            setId: setId
        };

        function getId() {
            return userId;
        };

        function setId(value) {
            userId = value;
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