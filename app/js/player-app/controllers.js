'use strict';

/* Controllers */

var rmtCtrlControllers = angular.module('rmtCtrlControllers', []);

rmtCtrlControllers.controller('playerCtrl', ['$scope', '$http', 'Player', 'Playlist',
    function($scope, $http, player, playlist) {

        var initPlaylist = function() {
            playlist.get().then(function(data) {
                $scope.playlist = data;
            }, function(error) {
                alert("Loading playlist failed :: " + error);
            });
        };
        initPlaylist();

        $http.get('data/tracks.json').success(function(data) {
            $scope.filelist = data;
        });

    }
]);
