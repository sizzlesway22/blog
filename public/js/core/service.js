(function() {
    'use strict';

    angular
        .module('app.core')
        .service('myService', userService)
        .service('postService', postService)
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

    function postService() {
        var posts = [];

        return {
            getPosts: getPosts,
            setPosts: setPosts
        };

        function getPosts() {
            return posts;
        };

        function setPosts(value) {
            posts = value;
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