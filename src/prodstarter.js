/**
 * This is only used in production to bootstrap the app.
 *
 * This file will be required in the minified file. It then requires 'app' thus executing all needed angular code before calling angular.bootstrap.
 */
define(['angular', 'app'], function(angular) {
    'use strict';
    angular.bootstrap(document, ['app']);
});