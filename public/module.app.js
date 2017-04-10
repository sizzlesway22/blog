(function() {
    'use strict';

    angular
        .module('app', ['app.core', 'app.dashboard'])
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
            });

        $locationProvider.html5Mode(true);
    }

})();