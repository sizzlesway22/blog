(function() {
    'use strict';

    angular
        .module('app.core')
        .service('myService', userService)
        .service('postService', postService)
        .factory('myFactory', testFactory);

    function userService($http) {
        var userId;
        var userName;

        return {
            getId: getId,
            setId: setId,
            getName: getName,
            setName: setName
        };

        function getId() {
            return userId;
        };

        function setId(value) {
            userId = value;
        };

        function getName() {
            return userName;
        };

        function setName(value) {
            userName = value;
        };
    };

    function postService() {
        var posts = [];

        return {
            getPosts: getPosts,
            setPosts: setPosts,
            addPost: addPost,
            removePost: removePost
        };

        function getPosts() {
            return posts;
        };

        function setPosts(value) {
            posts = value;
        };

        function addPost(post) {
            posts.push(post);
            return posts;
        };

        function removePost(postTitle) {
            var index = posts.indexOf(post);
            posts.splice(index, 1);
            return posts;
        }
    };

    function testFactory() {
        return {
            sayGoodbye: function(text) {
                return "Factory says \"Goodbye " + text + "\"";
            }  
        } 
    };

})();