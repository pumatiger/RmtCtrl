'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('playerCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('data/tracks.json').success(function(data) {
      $scope.tracks = data;
    });
  }]);
