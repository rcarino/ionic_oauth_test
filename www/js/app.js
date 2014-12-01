// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        /*
         This code is needed because the fragment that the OAuth 2.0 server returns is recognized as the routing path
         /access_token. For this reason you need to add a routing rule catching the access token, parse it and then
         redirect to the desired view of your app.
         */
        //$routeProvider
        //    .when('/access_token=:accessToken', {
        //        template: '',
        //        controller: function ($location, $rootScope) {
        //            var hash = $location.path().substr(1);
        //            AccessToken.setTokenFromString(hash);
        //            $rootScope.token = hash;
        //            console.log(hash);
        //            $location.path('/');
        //            $location.replace();
        //        }
        //    });

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('accept-oauth-token', {
                url: '/access_token=:accessToken',
                controller: function ($location) {
                    var hash = $location.path().substr(1),
                        hashPairs = _.map(hash.split('&'), function (str) {
                            return str.split('=');
                        }),
                        hashObj = _.zipObject(hashPairs);
                    window.sessionStorage.authToken = hashObj.access_token;
                    $location.path('/');
                    $location.replace();
                }
            })

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            .state('tab.friends', {
                url: '/friends',
                views: {
                    'tab-friends': {
                        templateUrl: 'templates/tab-friends.html',
                        controller: 'FriendsCtrl'
                    }
                }
            })
            .state('tab.friend-detail', {
                url: '/friend/:friendId',
                views: {
                    'tab-friends': {
                        templateUrl: 'templates/friend-detail.html',
                        controller: 'FriendDetailCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');
    });

