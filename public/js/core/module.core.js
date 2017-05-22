(function() {
    'use strict';

    angular
        .module('app.core', ['ui.router'])
        .factory('myInterceptor', myInterceptor)
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('testInterceptor');
        })
        .config(config);

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');
        
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'HomeController as Home'
            })
            .state('auth', {
                url: '/auth',
                templateUrl: 'views/auth.html',
                controller: 'AuthController as Auth'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController as Ctrl'
            });

        //$locationProvider.html5Mode(true);
    }

    function myInterceptor() {
        return {
            request: function(config) {
                config.headers['Authorization'] = myService.getId();
                return config;
            }
        };
    }

})();