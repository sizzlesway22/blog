(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController($http, myService, myFactory) {
    var vm = this;
    vm.posts = [];
    vm.message = "";

    vm.fromService = myService.sayHello("Jaime");
    vm.fromFactory = myFactory.sayGoodbye("Kevin");

    vm.getPosts = function() {
        $http.get("/posts")
        .then(function(response) {
            vm.posts = response.data;
        });
    };

    vm.getPosts();
}

})();