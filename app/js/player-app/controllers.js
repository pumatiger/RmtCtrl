'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('playerCtrl', ['$scope', '$http', 'Player',
    function($scope, $http, player) {

        player.playlist.get(function(playlist) {
            console.log(playlist);
            $scope.playlist = playlist;
            $scope.$apply();
        }, function() {});

        $http.get('data/tracks.json').success(function(data) {
            $scope.filelist = data;
        });

    }
]);
