define(['angular', 'modules/invoices/indexController', 'modules/invoices/newController', 'modules/invoices/editController'],
    function(angular, IndexController, NewController, EditController) {
        'use strict';
        var configFn = [];
        var invoices = angular.module('invoices', configFn);
        invoices.controller('invoices.controllers.index', IndexController);
        invoices.controller('invoices.controllers.new', NewController);
        invoices.controller('invoices.controllers.edit', EditController);
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