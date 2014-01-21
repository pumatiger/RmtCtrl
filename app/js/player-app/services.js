'use strict';

/* Services */

var playerServices = angular.module('playerServices', []);

playerServices.factory('Player', function() {
    return new RMTCTRL.Player();
});

playerServices.factory('FileBrowser', function() {
    return new RMTCTRL.FileBrowser();
});
