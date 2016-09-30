(function(window, angular, undefined) {'use strict';
    angular.module('service.http', [])

    .constant('HttpMethod', {
        OPTIONS: 'options',
        GET: 'get',
        POST: 'post',
        PUT: 'put',
        DELETE: 'delete',
        HEAD: 'head',
        TRACE: 'trace',
        CONNECT: 'connect'
    })

    .service('HttpService', ["$http", "$q", "HttpOptions", "HttpMethod", function($http, $q, HttpOptions, HttpMethod) {
        // Service
        
        var HttpService = {
            GET: HttpMethod.GET,
            POST: HttpMethod.POST,
            PUT: HttpMethod.PUT,
            DELETE: HttpMethod.DELETE,
            handleRequest: handleRequest
        };
        
        return HttpService;
    
        /**
         * Handles a http/s request
         * @param {string} method of http request
         * @param {string} url used to make the request
         * @param {boolean} [withCredentials=false] indicates if cookies should be passed with the request
         * @param {Object} [parameters] for the request, e.g. {"name": "Imagus", "address": "139 Sandgate Road"}
         * @param {HttpOption[]} [options] for the request
         * @return {Promise.Object} the result of the request
         */
        function handleRequest(method, url, withCredentials, parameters, options) {
            var req = {
                method: method,
                url: url,
                withCredentials: withCredentials
            };
            
            // if not found, default withCredentials to false
            withCredentials = typeof withCredentials !== 'undefined' ? withCredentials : false;
    
            if (parameters) {
                req['params'] = parameters;
            }
    
            if (options) {
                options.httpOptions.forEach(function(option) {
                    req[option.key] = option.value;
                });
            }
    
            return $http(req).then(_handleSuccess, _handleError);
        }
    
        function _handleError(response) {
            return $q.reject(response);
        }
    
        function _handleSuccess(response) {
            return response;
        };
    }])
    
    /**
     * A http/s option
     * @typedef HttpOption
     * @type {Object}
     * @property {string} key is the key for the option
     * @property {Object} value is the value for the option
     */
    .factory('HttpOption', function() {
        var HttpOption = function(data) {
            // Factory
            
            var HttpOption = {
                key: data.key,
                value: data.value
            };
            
            return HttpOption;
        };
        
        return HttpOption;
    })
    
    /**
     * A collection of http/s option
     * @typedef HttpOptions
     * @type {object}
     * @property {HttpOption[]} httpOptions is the collection of options
     */
    .factory('HttpOptions', ["HttpOption", function(HttpOption) {
        var HttpOptions = function(passedOptions) {
            var options = [];
            var HEADERS = "headers";
            _processPassedOptions(passedOptions);
            
            // Factory
            
            var HttpOptions = {
                httpOptions: options,
                transformRequest: transformRequest,
                data: data,
                headers: headers,
                header: header
            };
            
            return HttpOptions;
            
            // Implementation
            
            /**
             * Adds a 'transformRequest' header
             * @memberof HttpOptions
             * @param {Object} value is the value
             */
            function transformRequest(value) {
                addHttpOption("transformRequest", value);
            }
            
            /**
             * Adds a data body
             * @memberof HttpOptions
             * @param {Object} value is the value
             */
            function data(value) {
                addHttpOption("data", value);
            }
            
            /**
             * Adds a header
             * @memberof HttpOptions
             * @param {string} key the header type
             * @param {Object} value the header value
             */
            function header(key, value) {
                var headerValues;
                if (_haveHttpOption(HEADERS)) {
                    headerValues = _findHttpOption(HEADERS)[0];
                    headerValues[key] = value;
                } else {
                    headerValues = {key: value};
                }
                
                headers(headerValues);
            }
            
            /**
             * Adds multiple headers
             * @memberof HttpOptions
             * @param {Object} value the headers values
             */
            function headers(value) {
                addHttpOption(HEADERS, value);
            }
            
            /**
             * Adds a http option
             * @memberof HttpOptions
             * @param {string} key the name of the http option
             * @param {Object} value the value for the http option
             */
            function addHttpOption(key, value) {
                if (_haveHttpOption(key)) {
                    for (var i in options) {
                        if (options[i].key === key) {
                            options[i].value = value;
                            break;
                        }
                    }
                } else {
                    options.push(new HttpOption({
                        key: key,
                        value: value
                    }));
                }
            }
            
            function _processPassedOptions(passedOptions) {
                if (typeof passedOptions != 'undefined') {
                    if (typeof passedOptions.transformRequest != 'undefined') {
                        transformRequest(passedOptions.transformRequest);
                    }
                    
                    if (passedOptions.data) {       
                        data(passedOptions.data);
                    }
                    
                    if (passedOptions.headers) {
                        headers(passedOptions.headers)
                    }
                }
            }
            
            function _haveHttpOption(key) {                
                var result = _findHttpOption(key);
                return result.length > 0;
            }
            
            function _findHttpOption(key) {
                return options.filter(function(obj) {
                    return obj.key === key;
                });
            }
        };
        
        return HttpOptions;
    }]);
})(window, window.angular);