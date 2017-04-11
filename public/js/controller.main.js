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

/*    var map = eon.map({
			channel: 'eon-map',
			id: 'myMap',
			mb_token: 'pk.eyJ1IjoiamFtZXNicmF0dGluIiwiYSI6ImNpbm1ldGlicDB6cjF0dmx5a3VodHIxbTIifQ.skNSn2UyS23Paqg3va5-SA',
			mb_id: 'jamesbrattin.06ak6j20'
		});

    map.setView([30.62, -96.33], 14);
*/
})();