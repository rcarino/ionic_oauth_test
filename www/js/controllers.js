angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope, $http) {
        $scope.loginState = 'Not authenticated';

        var authToken = window.sessionStorage.authToken;
        if (authToken) {
            $http.get('https://graph.facebook.com/me?access_token=' + authToken)
                .success(function(data) {
                    $scope.loginState = data;
                });
        }
    })

    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function ($scope) {
    });