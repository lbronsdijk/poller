angular.module('pollerApp')
    .controller('PollerCtrl', ['$scope', '$http', 'poller', function($scope, $http, poller) {
        $scope.title        = "Poller!";
        $scope.loggedIn     = false;
        $scope.statusCode   = "Unknown";
        $scope.pollerStatus = "Idle";
        $scope.requestCount = 0;
        $scope.responseTime = 0;
        $scope.logger       = "";
        var currentTime     = (new Date()).getTime();

        /**
         * Start polling
         */
        $scope.start = function () {
            $scope.pollerStatus = "Started";
            $scope.requestCount = 0;
            $scope.logEvent('Polling started');

            // URI to poll
            var myPoller = poller.get("", {
                action: 'get',
                delay: 100,
                catchError: true,
                smart: true
            });

            myPoller.promise.then(null, null, function (result) {
                $scope.statusCode = result.status;
                $scope.data       = result.data;

                $scope.logEvent('Request');
                $scope.requestCount++;

                switch (result.status) {
                    case 401:
                        poller.stopAll();

                        $scope.pollerStatus = "Stopped";
                        $scope.logEvent('Unauthorized. Poller stopped.');
                        break;
                    case 503:
                        poller.stopAll();

                        $scope.pollerStatus = "Stopped";
                        $scope.logEvent('Internal Server Error. Poller stopped.');
                        break;
                    default:
                }
            });
        };

        /**
         * Stop polling
         */
        $scope.stop = function () {
            poller.stopAll();

            $scope.pollerStatus = "Stopped";
            $scope.logEvent('Poller stopped.');
        };

        /**
         * Login
         *
         * Grant access and set session
         */
        $scope.login = function () {
            var request = {
                method: 'PUT',
                url: '', // Login endpoint
                data: { 
                    key: '', // Username
                    secret: '', // Password
                    type: 'EMAIL_PASSWORD'
                }
            };

            $http(request).then(function (result) {
                if (result.status === 200) {
                    $scope.loggedIn   = true;
                    $scope.statusCode = result.status;
                    $scope.data       = result.data;

                    console.log(result.headers());

                    $scope.logEvent('Logged in');
                }
            }, function (reason) {
                console.log(reason);
            });
        };

        /**
         * logEvent
         *
         * Sends log to view
         * 
         * @param  string event
         */
        $scope.logEvent = function (event) {
            $scope.logger += event + '\n';
        };

    }]);
