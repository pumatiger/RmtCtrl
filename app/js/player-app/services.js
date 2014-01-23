'use strict';

/* Services */

var playerServices = angular.module('playerServices', []);

playerServices.factory('Player', function() {
    return new RMTCTRL.Player();
});

playerServices.factory('PlayerControls', function() {
    return {
        load: function() {}
    };
});

playerServices.factory('PlaylistControls', function() {

    return {

        /**
         * retrieves playlist
         *
         * @return {Promise} -> Array
         */
        get: function() {

        }

    };
});

playerServices.factory('FileBrowser', function() {
    return new RMTCTRL.FileBrowser();
});
