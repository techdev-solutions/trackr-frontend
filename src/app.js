/* global document */
define(['angular', 'jQuery', 'angular-route', 'modules/base/base', 'modules/trackr/trackr'], function(angular, $) {
    'use strict';
    var configFn = ['ngRoute', 'base', 'trackr'];
    var app = angular.module('app', configFn);
    var trackrUser;
    app.run(['base.services.user', function (UserService) {
        UserService.setUser(trackrUser);
    }]);

    /*
        Load the current user and its authorities before the app starts.
        After the user is loaded the trackr app gets bootstrapped manually.
     */
    angular.element(document).ready(function () {
        $.get('/api/users/current', function (data) {
            trackrUser = data;
            angular.bootstrap(document, ['app']);
        });
    });

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'src/views/welcome.html',
                controller: 'trackr.pages.controllers.welcome'
            }).
            when('/zeiten', {
                templateUrl: 'scr/views/zeiten.html'
            });
    }]);
    return app;
});