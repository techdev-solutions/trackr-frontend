/* global localStorage */
define(['angular', 'jQuery', 'restangular', 'angular-ui-router', 'angular-ui', 'twitter-bootstrap', 'angular-translate', 'angular-translate-loader-url',
    'modules/base/base', 'modules/trackr/trackr', 'modules/invoices/invoicesModule', 'modules/shared/shared', 'modules/reportr/reportrModule'
], function(angular) {
    'use strict';
    var configFn = ['ui.router', 'ui.bootstrap', 'base', 'trackr', 'reportr', 'restangular', 'invoices', 'shared', 'pascalprecht.translate'];
    var app = angular.module('app', configFn);

    app.config(['RestangularProvider', '$locationProvider', 'uibPaginationConfig', '$httpProvider', '$translateProvider',
        function(RestangularProvider, $locationProvider, paginationConfig, $httpProvider, $translateProvider) {
            $translateProvider.useUrlLoader('api/translations');

            $locationProvider.html5Mode(true).hashPrefix('!');

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
                if (operation === 'getList' && data._embedded) {
                    returnData = data._embedded[route];
                    /*
                     Fallback: if the returned data does not contain the route key take the first one.
                     Example: data = { _embedded: { travelExpenses: [] } } but route = 'expenses'.
                     */
                    if (!returnData) {
                        returnData = data._embedded[Object.keys(data._embedded)[0]];
                    }
                    //if there is pagination info make it one-based.
                    if (data.page) {
                        returnData.page = data.page;
                        returnData.page.number = returnData.page.number + 1;
                    }
                } else if (operation === 'getList' && !data._embedded) {
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

            var oauthToken = localStorage.getItem('oauthToken');
            if(oauthToken) {
                $httpProvider.defaults.headers.common.Authorization = 'Bearer ' + oauthToken;
            }

            // We can not inject $state directly as this gives a circular dependency
            $httpProvider.interceptors.push(['$q', '$injector', function($q, $injector) {
                return {
                    responseError: function(response) {
                        if(response.status === 401) {
                            $injector.get('$state').transitionTo('authorize');
                        }
                        return $q.reject(response);
                    }
                };
            }]);
        }]);
    return app;
});