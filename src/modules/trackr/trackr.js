define(['angular',
    'modules/trackr/services/services',
    'modules/trackr/administration/administrationModule',
    'modules/trackr/employee/employeeModule',
    'modules/trackr/supervisor/supervisorModule',
    'angular-translate',
    'angular-translate-loader-url'],
    function(angular, services) {
        'use strict';
        var configFn = ['trackr.administration', 'trackr.employee', 'trackr.supervisor', 'pascalprecht.translate'];
        var trackr = angular.module('trackr', configFn);

        trackr.config(['$stateProvider', function($stateProvider) {
            $stateProvider.
                state('trackr', {
                    url: '/trackr',
                    breadcrumbTranslateCode: 'PAGES.HOME.BREADCRUMB',
                    resolve: {
                        employee: ['trackr.services.employee', function(EmployeeService) {
                            return EmployeeService.loadEmployee();
                        }]
                    },
                    abstract: true,
                    views: {
                        'top-menu@': {
                            templateUrl: 'src/modules/trackr/top-menu.tpl.html',
                            controller: 'base.controllers.navigation'
                        },
                        'breadcrumbs@': {
                            templateUrl: 'src/modules/base/partials/breadcrumbs.tpl.html',
                            controller: 'base.controllers.breadcrumb-controller'
                        }
                    }
                }).
                state('trackr.home', {
                    url: '',
                    views: {
                        'center@': {
                            templateUrl: 'src/modules/trackr/welcome.tpl.html'
                        }
                    }
                });
        }]);

        services.init(trackr);
        return trackr;
    });