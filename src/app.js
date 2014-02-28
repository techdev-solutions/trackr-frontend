define(['angular', 'jQuery', 'restangular', 'angular-ui-router', 'angular-ui', 'twitter-bootstrap', 'modules/base/base', 'modules/trackr/trackr', 'modules/example/example',
    'modules/shared/shared'
], function(angular) {
    'use strict';
    var configFn = ['ui.router', 'ui.bootstrap', 'base', 'trackr', 'restangular', 'example', 'shared'];
    var app = angular.module('app', configFn);

    app.run(['base.services.user', '$http', function(UserService, $http) {
        $http.get('/api/principal').success(function(data) {
            UserService.setUser(data);
        });
    }]);

    app.config(['RestangularProvider', '$locationProvider', 'paginationConfig', function(RestangularProvider, $locationProvider, paginationConfig) {
        $locationProvider.html5Mode(false);
        RestangularProvider.setBaseUrl('/api');
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

        /*
         Global pagination configuration
         */
        paginationConfig.previousText = '<';
        paginationConfig.nextText = '>';
    }]);

    /**
     * Implement state authorization
     */
    app.run(['$rootScope', '$log', 'base.services.user', function($rootScope, $log, UserService) {
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