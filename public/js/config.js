(function() {
    'use strict';

    angular
        .module('app.core')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'HomeController',
                controllerAs: 'Ctrl'
            })
            .when('/dashboard', {
                templateUrl: 'dashboard.html',
                controller: 'SomeController',
                controllerAs: 'Ctrl'
            });
    }

})();