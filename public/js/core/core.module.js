(function() {
    'use strict';

    angular
        .module('app.core', ['ui.router'])
        .config(config);

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
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'views/profile.html',
                controller: 'ProfileController as Ctrl'
            });
        $urlRouterProvider.otherwise('/home');
        
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/home');
                    }
                    return $q.reject(response);
                }
            };
        }]);
        //$locationProvider.html5Mode(true);
    }

})();