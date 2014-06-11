define(['angular', 'modules/invoices/indexController', 'modules/invoices/newController'],
    function(angular, IndexController, NewController) {
        'use strict';
        var configFn = [];
        var invoices = angular.module('invoices', configFn);
        invoices.controller('invoices.controllers.index', IndexController);
        invoices.controller('invoices.controllers.new', NewController);
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