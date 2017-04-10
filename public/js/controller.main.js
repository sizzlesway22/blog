(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController($http, myService, myFactory) {
    var vm = this;
    vm.posts = [];
    vm.showForm = false;
    vm.showPosts = false;
    vm.editing = false;
    vm.post = "";
    vm.message = "";

    vm.fromService = myService.sayHello("Jaime");
    vm.fromFactory = myFactory.sayGoodbye("Kevin");

    vm.getPosts = function() {
        $http.get("/posts")
        .then(function(response) {
            vm.posts = response.data;
        });
    };

    vm.newPost = function() {
        vm.showForm = !vm.showForm;
        vm.editing = false;
        vm.title = "";
        vm.body = "";
    }

    vm.addPost = function() {
        $http.post("/posts", {title:vm.title, body:vm.body})
        .then(function(response) {
            vm.posts = response.data;
        }, function(response) {
            alert(response);
        });
        vm.title = "";
        vm.body = "";
    };

    vm.editPost = function(index) {
        vm.showForm = true;
        vm.editing = true;
        vm.message = index;
        vm.title = vm.posts[index].title;
        vm.body = vm.posts[index].body;
    };

    vm.commitEdit = function() {
        $http.put("/posts/"+vm.message, {title:vm.title, body:vm.body})
        .then(function(response) {
            vm.posts = response.data;
            vm.title = "";
            vm.body = "";
        }, function(response) {
            alert(response);
        });
    }

    vm.deletePost = function() {
        var res = confirm("Are you sure you want to delete this post?");
        if (res == true) {
            $http.delete("/posts/"+vm.message)
            .then(function(response) {
                vm.posts = response.data;
                vm.title = "";
                vm.body = "";
            }, function(response) {
                alert(response);
            });
        } else {
            return;
        }
    }

    vm.getPosts();
}

})();