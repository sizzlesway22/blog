(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('userFactory', Users);

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
    }

})();