// Delay image appearance on load
// create container for image information
// scale images accordingly

angular.module('momentumArtApp', [])
    .controller('backgroundImage', ['$scope', '$timeout', '$interval', 'getBackgroundImage', function($scope, $timeout, $interval, getBackgroundImage) {

        getBackgroundImage.getImage().then(function successCallbackFn(data) {
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

}])

// .directive('fadeIn', function($timeout){
//     return {
//         restrict: 'A',
//         link: function($scope, $element, attrs){
//             $element.addClass("ng-hide-remove");
//             $element.on('load', function() {
//                 $element.addClass("ng-hide-add");
//             });
//         }
//     };
// });

// .directive('fadeIn', function($timeout) {
//     return {
//         restrict: 'A',
//         link: function($scope, $element, attrs) {
//             $element.addClass("ng-hide-remove");
//             $element.on('load', function() {
//                 $timeout($element.addClass("ng-hide-add"), 2000); //Adding timeout
//             });
//         }
//     }
// });

.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});


// var getRandomNumber = function(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
// }
