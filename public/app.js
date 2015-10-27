angular.module('pollerApp', ['ngRoute', 'emguo.poller'])
    .config(['$routeProvider', '$httpProvider', 'pollerConfig', function($routeProvider, $httpProvider, pollerConfig) {
        // Create new poller when calling get()
        pollerConfig.neverOverwrite = true;
        
        // Active cookies
        $httpProvider.defaults.withCredentials = true;

        // Routes
        $routeProvider
            .when('/', {
                templateUrl: 'views/poller.html',
                controller: 'PollerCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
