angular
    .module('app', [])
    .controller('SomeController', SomeController);

function SomeController() {
    var vm = this;
    vm.posts = [];
    vm.newPost = false;
    vm.showPosts = false;

    vm.addPost = function() {
        vm.posts.push(vm.formData.post);
        console.log("you clicked me");
    };
}