/* global document */
define(['angular', 'jQuery', 'restangular', 'angular-ui-router', 'modules/base/base', 'modules/trackr/trackr', 'modules/example/example', 'modules/shared/shared'
], function (angular, $) {
    'use strict';
    var configFn = ['ui.router', 'base', 'trackr', 'restangular', 'example', 'shared'];
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

    app.config(['RestangularProvider', '$locationProvider', function (RestangularProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.addResponseInterceptor(function (data, operation, route) {
            var returnData;
            if (operation === 'getList') {
                returnData = data._embedded[route];
                returnData.page = data.page;
            } else {
                returnData = data;
            }
            return returnData;
        });
    }]);
    return app;
});