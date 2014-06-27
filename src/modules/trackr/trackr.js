define(['angular',
    'modules/trackr/services/services',
    'modules/trackr/administration/administrationModule',
    'modules/trackr/employee/employeeModule',
    'modules/trackr/supervisor/supervisorModule'],
    function(angular, services) {
        'use strict';
        var configFn = ['trackr.administration', 'trackr.employee', 'trackr.supervisor'];
        var trackr = angular.module('trackr', configFn);

        trackr.config(['$stateProvider', function($stateProvider) {
            $stateProvider.
                state('app.trackr', {
                    url: 'trackr',
                    breadcrumbTranslateCode: 'PAGES.HOME.BREADCRUMB',
                    resolve: {
                        //We have to require the user injection here, otherwise on a full page refresh the 'user resolve' in tha
                        //app state will be run *after* this employee resolve - which means the UserService does not know
                        //the user yet and the EmployeeService will fail.
                        employee: ['trackr.services.employee', 'app.user', function(EmployeeService) {
                            return EmployeeService.loadEmployee();
                        }]
                    },
                    views: {
                        'top-menu@app': {
                            templateUrl: 'src/modules/trackr/top-menu.tpl.html',
                            controller: 'base.controllers.navigation'
                        },
                        'breadcrumbs@app': {
                            templateUrl: 'src/modules/base/partials/breadcrumbs.tpl.html',
                            controller: 'base.controllers.breadcrumb-controller'
                        },
                        'center@app': {
                            templateUrl: 'src/modules/trackr/welcome.tpl.html'
                        }
                    }
                });
        }]);

        services.init(trackr);
        return trackr;
    });