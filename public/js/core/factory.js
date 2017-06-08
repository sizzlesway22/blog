(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('userFactory', Users)
		.factory('postFactory', Posts);

    function Users($http, $localStorage, $window, $location, myService) {

		function changeUser(user) {
            angular.extend(currentUser, user);
        };
 
        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                var base64 = encoded.replace('-', '+').replace('_', '/');
                user = JSON.parse($window.atob(base64));
            }
            return user;
        };
 
        

        return {
            me : function() {
				var currentUser = getUserFromToken();
        		myService.setId(currentUser._id);
                return currentUser;
            },
			get : function() {
				return $http.get('/users');
			},
			login : function(postData) {
				return $http.post('/login', postData);
			},
			register : function(postData) {
				return $http.post('/register', postData);
			},
			logout : function() {
				//changeUser({});
                delete $localStorage.token;
                return;
			},
			delete : function(id) {
				return $http.delete('/users/' + id);
			}
		}
    };

	function Posts($http) {
		return {
			get : function() {
				return $http.get('/posts');
			},
			post : function(postData) {
				return $http.post('/posts', postData);
			},
			update : function(postData) {
				return $http.put('/posts/:id', postData);
			},
			delete : function(id) {
				return $http.delete('/posts/' + id);
			}
		}
	};

})();