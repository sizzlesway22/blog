(function() {
    'use strict';

    angular
        .module('app.core', ['ngRoute'])
        .config(config);

    function config($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'HomeController',
                controllerAs: 'Home'
            })
            .when('/dashboard', {
                templateUrl: 'dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'Ctrl'
            }).otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }

})();