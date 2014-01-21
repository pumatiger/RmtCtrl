'use strict';

/* Filters */

var playerFilters = angular.module('playerFilters', []);

playerFilters.filter('extractFileName', function() {

    return function(fileRef) {
        return fileRef.replace(/.*[\/\\](.+\.\w{3,4}$)/, '$1');
    };
});
