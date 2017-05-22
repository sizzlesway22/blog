(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController($http, myService, userFactory, postFactory) {
        var vm = this;
        vm.posts = [];
        vm.showForm = false;
        vm.showPosts = true;
        vm.editing = false;
        vm.userId = myService.getId();
        vm.post = "";
        vm.message = 'this is your user id: ' + vm.userId;

        vm.getUsers = function() {
            userFactory.get("/users")
            .then(function(response) {
                vm.message = response.data;
            }, function(response) {
                alert(response.data);
            });
        };

        vm.getPosts = function() {
            postFactory.get()
            .then(function(response) {
                vm.posts = response.data;
                vm.message = response.data
            }, function(response) {
                alert(response.data);
            });
        };

        vm.newPost = function() {
            vm.showForm = !vm.showForm;
            vm.editing = false;
            vm.title = "";
            vm.body = "";
        }

        vm.addPost = function() {
            postFactory.post({title:vm.title, body:vm.body, id:vm.userId})
            .then(function(response) {
                vm.posts = response.data;
            }, function(response) {
                alert(response.message);
            });
            vm.title = "";
            vm.body = "";
            vm.getPosts();
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
        }

        vm.getPosts();
    };

})();