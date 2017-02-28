angular
    .module('app', [])
    .controller('SomeController', SomeController)
    .directive('myDirective', testDirective)

function SomeController($http) {
    var vm = this;
    vm.posts = [];
    vm.newPost = false;
    vm.showPosts = false;
    vm.post = "";

    vm.getPosts = function() {
        $http.get("/posts")
        .then(function(response) {
            vm.posts = response.data;
        });
    }

    vm.addPost = function() {
        $http.post("/posts", {title:vm.title, body:vm.body})
        .then(function(response) {
            vm.posts = response.data;
        }, function(response) {
            alert(response);
        });
        console.log("you clicked me");
    };

    vm.getPosts();
}

function testDirective() {
    return {
        template: "I am a cool directive type thing!"
    };
}