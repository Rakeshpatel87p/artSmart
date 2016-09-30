angular.module('momentumArtApp', [])
    .controller('backgroundImage', ['$scope', '$interval', 'getBackgroundImage', function($scope, $interval, getBackgroundImage) {
        // Ugly here - find new spot
        var updatedClockAndGreeting = function() {
            $scope.time = Date.now();
            var d = new Date();
            var h = d.getHours();
            if (h <= 11) {
                $scope.greeting = 'Morning Sunshine'
            } else if (h > 11 && h <= 16) {
                $scope.greeting = 'Afternoon Cutie'
            } else if (h > 16 && h <= 20) {
                $scope.greeting = 'Evening Greeting'
            } else if (h > 20 && h <= 24) {
                $scope.greeting = 'Happy Night'
            }
        }
        updatedClockAndGreeting();
        $interval(updatedClockAndGreeting, 1000);
        // $scope.userName = 'hello8';
        getBackgroundImage.getImage().then(function successCallbackFn(data) {
            console.log('this is the data', data)
            var randomNumber = getRandomNumber(0, 5)
            $scope.backgroundImageUrl = data[randomNumber];
        }, function errorCallbackFn(response) {
            console.log(response)
        })
    }])

// Returns link by resolving promise before passing in
.factory('getBackgroundImage', ['$http', function($http) {
    var user = 'testUser';
    var getBackgroundImage = {
        getImage: function() {
            var promise = $http.get(user + '/paintingsToDisplay').then(function(response) {
                return response.data
            });
            return promise
        }
    }
    console.log('here is the bckgrd image', getBackgroundImage);
    return getBackgroundImage
}])

var getRandomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
