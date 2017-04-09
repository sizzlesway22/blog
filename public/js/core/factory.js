(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('myFactory', testFactory);

    function testFactory() {
        return {
            sayGoodbye: function(text) {
                return "Factory says \"Goodbye " + text + "\"";
            }  
        } 
    }



})();