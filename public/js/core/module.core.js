(function() {
    'use strict';

    angular
        .module('app.core', ['ui.router'])
        .config(config);

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');
        
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home.html',
                controller: 'HomeController as Home'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'dashboard.html',
                controller: 'DashboardController as Ctrl'
            });

        //$locationProvider.html5Mode(true);
    }

})();