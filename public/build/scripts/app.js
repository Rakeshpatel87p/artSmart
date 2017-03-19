angular.module('momentumArtApp', [])
    .controller('backgroundImage', ['$scope', '$timeout', '$interval', 'getBackgroundImage', function($scope, $timeout, $interval, getBackgroundImage) {

        getBackgroundImage.getImage().then(function successCallbackFn(data) {
            var randomNumber = getRandomNumber(0, 5)
            $scope.backgroundImageUrl = data._links.image.href.replace('{image_version}', 'normalized')
            console.log(data);
            // $scope.backgroundImageUrl = data.links.image;
            $scope.paintingName = data.title;
            $scope.paintingBlurb = false;
            // $timeout(function() { $scope.paintingBlurb = true }, 3000)
            // paintingBlurbTimer();
            function paintingBlurbTimer() {
                $timeout(function() { $scope.paintingBlurb = true }, 3000)
            };
            // $scope.artistName = data[randomNumber].artist;
            // $scope.yearPainted = data[randomNumber].date;
        }, function errorCallbackFn(response) {
            console.log('this is the error message', response);
            $scope.backgroundImageUrl = './artSmart.png';
            $scope.paintingName = 'RockyP';        

        });

    }])


.factory('getBackgroundImage', ['$http', function($http) {
    var user = 'testUser3';
    // Chrome extension WORKS by going to heroku here
    var herokuURL = "https://damp-springs-37879.herokuapp.com";
    var getBackgroundImage = {
        getImage: function() {
            var promise = $http.get('/paintingToDisplay').then(function(response) {
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
