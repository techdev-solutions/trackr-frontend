define(['angular', 'modules/invoices/controllers'], function(angular, controllers) {
    'use strict';
    var configFn = [];
    var invoices = angular.module('invoices', configFn);
    controllers.init(invoices);
    invoices.config(['$stateProvider', function($stateProvider) {
        $stateProvider.
            state('invoices', {
                url: '/invoices',
                abstract: true,
                views: {
                    'top-menu@': {
                        templateUrl: 'src/modules/invoices/top-menu.tpl.html',
                        controller: 'base.controllers.navigation'
                    }
                }
            }).
            state('invoices.home', {
                url: '',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/invoices/index.tpl.html',
                        controller: 'invoices.controllers.index'
                    }
                },
                needsAuthority: 'ROLE_ADMIN'
            });
    }]);
    return invoices;
});