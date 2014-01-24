'use strict';

/* Services */

var rmtCtrlServices = angular.module('rmtCtrlServices', []);

rmtCtrlServices.factory('Player', ['$http', '$q',
    function($http, $q) {
        return {
            load: function() {}
        };
    }
]);

rmtCtrlServices.factory('Playlist', ['$http', '$q',
    function($http, $q) {

        return {

            /**
             * retrieves playlist
             *
             * @return {Promise} => Array
             */
            get: function() {
                return $http.post(
                    'http://rmtctrl.apiary.io/playlist/get',
                    { 'authKey': 93216429521 }
                ).then(function(response) { // success
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }
                }, function(response) { // error
                    return $q.reject(response.data);
                });
            }

        };
    }
]);

rmtCtrlServices.factory('Library', function() {

});
