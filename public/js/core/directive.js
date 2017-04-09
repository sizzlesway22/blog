(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('myDirective', testDirective);

    function testDirective() {
        return {
            template: "I am a cool directive type thing!"
        };
    }

})();