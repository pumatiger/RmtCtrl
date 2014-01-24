'use strict';

/* Controllers */

var rmtCtrlControllers = angular.module('rmtCtrlControllers', []);

rmtCtrlControllers.controller('PlayerCtrl', ['$scope', '$http', 'Playlist',
    function($scope, $http, Playlist) {

        var initPlaylist = function() {
            Playlist.get().then(function(data) {
                $scope.playlist = data;
            }, function(error) {
                alert('Loading playlist failed :: ' + error);
            });
        };
        initPlaylist();

        /*
        $http.get('data/tracks.json').success(function(data) {
            $scope.filelist = data;
        });
        */

    }
]);
