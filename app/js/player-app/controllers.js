'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('playerCtrl', ['$scope', '$http', 'Player',
  function($scope, $http) {

    $http.get('data/tracks.json').success(function(data) {
      $scope.filelist = data;
    });

  }]);
