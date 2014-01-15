'use strict';

/* App Module */

var playerApp = angular.module('playerApp', ['playerControllers'])
	.controller('testCtrl', function ($scope) {
		$scope.test = "knock knock";
	});
