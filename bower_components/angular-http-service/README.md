# angular-http-service

An angular.js service for handling http/s requests.

## Install

### NPM

```
npm install angular-http-service
```

### Bower

```
bower install angular-http-service
```

## Include

Add this script to your ```index.html```:

### NPM

```html
<script src="/node_modules/angular-http-service/angular-http-service.min.js"></script>
```

### Bower

```html
<script src="/bower_components/angular-http-service/src/angular-http-service.js"></script>
```

Inject the service:

```js
angular.module('app', ['service.http'])

.service('MyHttpService', function(HttpService) {
  ...
}
```

## Use

### Basic


Create a service
```js
.service('MyHttpService', function(HttpService) {
  var service = {
    getMyData: getMyData
  };

  return service;

  function getMyData() {
    return HttpService.handleRequest(HttpService.GET, 'http://api.example.com/data');
  }
}
```

Then consume the service
```js
.controller('DataCtrl', function($scope, MyHttpService) {
  $scope.getData = function() {
    MyHttpService.getMyData()
      .then(function(success) {
        console.log(success);
      }, function(error) {
        console.log(error)
      })
  };
}
```

### .handleRequest(method, url, withCredentials, parameters, options)

#### - method

This should be any one of the service methods, which are:

  * .GET
  * .POST
  * .PUT
  * .DELETE

#### - url

A string value of URL of the endpoint

#### - withCredentials (optional, default: false)

A boolean value, indicating that cookies should be included as part of the request - for use with CORS requests.

Further information on this option ([from here](http://www.html5rocks.com/en/tutorials/cors/)):

> The .withCredentials property will include any cookies from the remote domain in the request, and it will also set any cookies from the remote domain. Note that these cookies still honor same-origin policies, so your JavaScript code can’t access the cookies from document.cookie or the response headers. They can only be controlled by the remote domain.

#### - parameters (optional)

A JSON object representing the named parameters for the request, e.g.,:

```json
{
  "name": "john",
  "surname": "doe"
}
```

#### - options (optional)

A HttpOptions object.

### HttpOptions

HttpOptions is a collection of HttpOption objects. Use this to add http options to your request.

First, Add HttpOptions to your service

```js
.service('MyHttpService', function(HttpService, HttpOptions) {
  ...
}
```
  
To create a HttpOptions object:

```js
var options = new HttpOptions({
    data: { username: 'john', password: 'test123' },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: function (obj) {
        var str = [];
        for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    }
});
```
