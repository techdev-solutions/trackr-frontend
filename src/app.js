/* global document */
define(['angular', 'jQuery', 'i18n', 'restangular', 'angular-ui-router', 'angular-ui', 'twitter-bootstrap', 'modules/base/base', 'modules/trackr/trackr', 'modules/example/example',
    'modules/shared/shared'
], function(angular, $, i18n) {
    'use strict';
    var configFn = ['ui.router', 'ui.bootstrap', 'base', 'trackr', 'restangular', 'example', 'shared'];
    var app = angular.module('app', configFn);

    var trackrUser;
    /*
     Load the current user and its authorities before the app starts.
     After the user is loaded the trackr app gets bootstrapped manually.
     */
    angular.element(document).ready(function() {
        $.get('api/principal', function(data) {
            trackrUser = data;
            i18n.init(app, trackrUser);
            angular.bootstrap(document, ['app']);
        });
    });

    app.config(['RestangularProvider', '$locationProvider', 'paginationConfig', function(RestangularProvider, $locationProvider, paginationConfig) {
        $locationProvider.html5Mode(false);
        RestangularProvider.setBaseUrl('api');
        /**  Restangularify the Spring Data Rest response
         Spring Data Rest returns lists like this:
         <code>
         {
            "_embedded": {
                "companies": [
                    ...
                ]
            }
         }
         </code>
         **/
        RestangularProvider.addResponseInterceptor(function(data, operation, route) {
            var returnData;
            if(operation === 'getList' && data._embedded) {
                returnData = data._embedded[route];
                returnData.page = data.page;
                //if there is pagination info make it one-based.
                if(returnData.page) {
                    returnData.page.number = returnData.page.number + 1;
                }
            } else if(operation === 'getList' && !data._embedded) {
                returnData = [];
                returnData.page = data.page;
            } else {
                returnData = data;
            }
            return returnData;
        });

        /**
         * Add entity validation errors to the globalMessages property of the error array.
         *
         * This is used for cross validation messages, e.g. start date not after end date.
         */
        RestangularProvider.setErrorInterceptor(function(response) {
            if(response.status === 400) {
                if(response.data.errors && response.data.errors.length) {
                    response.data.errors.globalMessages = [];
                    for (var i = 0; i < response.data.errors.length; i++) {
                        var obj = response.data.errors[i];
                        if(obj.property === '') {
                            response.data.errors.globalMessages.push(obj);
                        }
                    }
                }
            }
        });

        /*
         Global pagination configuration
         */
        paginationConfig.previousText = '<';
        paginationConfig.nextText = '>';
    }]);

    /**
     * Implement state authorization
     */
    app.run(['$rootScope', '$log', 'base.services.user', '$http', function($rootScope, $log, UserService, $http) {
        UserService.setUser(trackrUser);
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if(toState.needsAuthority) {
                var user = UserService.getUser();
                $log.debug('User ' + user.email + ' tries to access state ' + toState.name + ' that needs the role ' + toState.needsAuthority);
                if(!UserService.userHasAuthority(toState.needsAuthority)) {
                    $log.debug('User ' + user.email + ' was denied access to state ' + toState.name);
                    event.preventDefault();
                } else {
                    $log.debug('User ' + user.email + ' was granted access to state ' + toState.name);
                }
            }
        });
    }]);

    return app;
});