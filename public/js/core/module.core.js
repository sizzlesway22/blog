(function() {
    'use strict';

    angular
        .module('app.core', ['ui.router'])
        .config(config)
        .factory('myInterceptor', myInterceptor);

    function config($stateProvider, $urlRouterProvider, $httpProvider) {        
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
        $urlRouterProvider.otherwise('/home');
        $httpProvider.interceptors.push('myInterceptor');
        //$locationProvider.html5Mode(true);
    }

    function myInterceptor() {
        return {
            request: function(config) {
                var id = myService.getId();
                if (id) {
                    config.headers['Authorization'] = myService.getId();
                    return config;
                } else return;
            }
        };
    }

})();