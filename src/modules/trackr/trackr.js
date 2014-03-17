define(['angular',
    'modules/trackr/i18n',
    'modules/trackr/administration/administrationModule',
    'modules/trackr/employee/employeeModule',
    'modules/trackr/supervisor/supervisorModule',
    'angular-translate'],
    function(angular, i18n) {
        'use strict';
        var configFn = ['trackr.administration', 'trackr.employee', 'trackr.supervisor', 'pascalprecht.translate'];
        var trackr = angular.module('trackr', configFn);
        trackr.config(['$stateProvider', function($stateProvider) {
            $stateProvider.
                state('trackr', {
                    url: '/trackr',
                    abstract: true,
                    views: {
                        'top-menu@': {
                            templateUrl: '/src/modules/trackr/top-menu.tpl.html',
                            controller: 'base.controllers.navigation'
                        }
                    }
                }).
                state('trackr.home', {
                    url: '',
                    views: {
                        'center@': {
                            templateUrl: '/src/modules/trackr/welcome.tpl.html'
                        }
                    }
                });
        }]);
        i18n.init(trackr);
        return trackr;
    });