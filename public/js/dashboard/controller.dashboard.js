(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController($http, $localStorage, $location, myService, postService, userFactory, postFactory) {
        var vm = this;
        vm.posts = postService.getPosts();
        vm.showForm = false;
        vm.loggedin = true;
        vm.showPosts = true;
        vm.editing = false;
        vm.user = userFactory.me();
        vm.userId = myService.getId();
        vm.message = 'Hello ' + vm.userId;

        if (!vm.userId) {
            vm.loggedin = false
        };

        vm.clearForm = function() {
            vm.title = "";
            vm.body = "";
        };

        vm.getUsers = function() {
            userFactory.get()
            .then(function(response) {
                vm.message = response.data;
            }, function(response) {
                alert(response.data);
            });
        };

        vm.getPosts = function() {
            vm.showPosts = !vm.showPosts;
            postFactory.get()
            .then(function(response) {
                vm.posts = response.data;
            }, function(response) {
                alert(response.data);
            });
        };

        vm.newPost = function() {
            vm.showForm = !vm.showForm;
            vm.editing = false;
            vm.clearForm();
        }

        vm.addPost = function() {
            postFactory.post({title:vm.title, body:vm.body, id:vm.userId})
            .then(function(response) {
                var update = postService.addPost(response.data);
                vm.posts = update;
            }, function(response) {
                alert(response.message);
            });
            vm.clearForm();
        };

        vm.editPost = function(index) {
            vm.showForm = true;
            vm.editing = true;
            vm.message = vm.posts[index]._id;
            vm.title = vm.posts[index].title;
            vm.body = vm.posts[index].body;
        };

        vm.commitEdit = function() {
            $http.put("/api/posts/"+vm.message, {title:vm.title, body:vm.body})
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
                postFactory.delete(vm.message)
                .then(function(response) {
                    vm.message = "success"
                    vm.title = "";
                    vm.body = "";
                }, function(response) {
                    alert(response);
                });
            } else {
                return;
            }
        };

        vm.logout = function() {
            userFactory.logout();
            $location.path('home');
        };

        vm.token = $localStorage.token;
        //vm.getPosts();
    };

})();