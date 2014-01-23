'use strict';

/* Filters */

var rmtCtrlFilters = angular.module('rmtCtrlFilters', []);

rmtCtrlFilters.filter('extractFileName', function() {

    return function(fileRef) {
        return fileRef.replace(/.*[\/\\](.+\.\w{3,4}$)/, '$1');
    };
});
