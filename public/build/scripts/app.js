angular.module('momentumArtApp', [])
    .controller('backgroundImage', ['$scope', '$timeout', '$interval', 'getBackgroundImage', function($scope, $timeout, $interval, getBackgroundImage) {
        $scope.paintingBlurb = false;
        paintingBlurbTimer();

        function paintingBlurbTimer() {
            $scope.paintingBlurb = true;
            $timeout(function() { $scope.paintingBlurb = false }, 3000)
        };

        getBackgroundImage.getImage().then(function successCallbackFn(data) {
            var randomNumber = getRandomNumber(0, 5)
            $scope.backgroundImageUrl = data[randomNumber].url;
            $scope.paintingName = data[randomNumber].title;
            $scope.artistName = data[randomNumber].artist;
            $scope.yearPainted = data[randomNumber].date;
        }, function errorCallbackFn(response) {
            console.log('this is the error message', response)
        });

    }])


.factory('getBackgroundImage', ['$http', function($http) {
    var user = 'testUser3';
    // Chrome extension WORKS by going to heroku here
    var herokuURL = "https://damp-springs-37879.herokuapp.com/";
    var getBackgroundImage = {
        getImage: function() {
            var promise = $http.get(herokuURL + user + '/paintingsToDisplay').then(function(response) {
                return response.data
            });
            return promise
        }
    }
    return getBackgroundImage

}]);

var getRandomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
