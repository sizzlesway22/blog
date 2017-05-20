(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('userFactory', Users)
		.factory('postFactory', Posts);

    function Users($http) {
        return {
			get : function() {
				return $http.get('/users');
			},
			login : function(postData) {
				return $http.post('/login', postData);
			},
			register : function(postData) {
				return $http.post('/register', postData);
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