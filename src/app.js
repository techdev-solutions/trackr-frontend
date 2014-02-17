/* global document */
define(['angular', 'jQuery', 'restangular', 'angular-route', 'modules/base/base', 'modules/trackr/trackr'], function(angular, $) {
    'use strict';
    var configFn = ['ngRoute', 'base', 'trackr', 'restangular'];
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
        $.get('/api/principal', function (data) {
            trackrUser = data;
            angular.bootstrap(document, ['app']);
        });
    });

    app.config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.addResponseInterceptor(function(data, operation, route) {
            var returnData;
            if(operation === 'getList') {
                returnData = data._embedded[route];
                returnData.page = data.page;
            } else {
                returnData = data;
            }
            return returnData;
        });
        $routeProvider.
            when('/', {
                templateUrl: 'src/views/welcome.html',
                controller: 'trackr.pages.controllers.welcome'
            }).
            when('/zeiten', {
                templateUrl: 'src/views/zeiten.html'
            }).
            when('/config', {
                templateUrl: 'src/views/config.html',
                controller: 'trackr.pages.controllers.config'
            });
    }]);
    return app;
});