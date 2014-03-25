define(['angular', 'modules/trackr/administration/controllers'], function(angular, controllers) {
    'use strict';
    var administration = angular.module('trackr.administration', []);

    administration.config(['$stateProvider', function($stateProvider) {
        $stateProvider
        .state('trackr.administration', {
            url: '/administration',
            views: {
                'center@': {
                    templateUrl: 'src/modules/trackr/administration/administration.tpl.html'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        })
        .state('trackr.administration.companies', {
            url: '/companies',
            views: {
                'center@': {
                    templateUrl: 'src/modules/trackr/administration/companies/list.tpl.html',
                    controller: 'trackr.administration.controllers.companies.list'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        })
        .state('trackr.administration.companies.edit', {
            url: '/{id:[\\d]+}',
            views: {
                'company': {
                    templateUrl: 'src/modules/trackr/administration/companies/edit.tpl.html',
                    controller: 'trackr.administration.controllers.companies.edit'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        })
        .state('trackr.administration.employees', {
            url: '/employees',
            views: {
                'center@': {
                    templateUrl: 'src/modules/trackr/administration/employees/list.tpl.html',
                    controller: 'trackr.administration.controllers.employees.list'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        })
        .state('trackr.administration.employees.edit', {
            url: '/{id:[\\d]+}',
            views: {
                'employee': {
                    templateUrl: 'src/modules/trackr/administration/employees/edit.tpl.html',
                    controller: 'trackr.administration.controllers.employees.edit'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        })
        .state('trackr.administration.employees.roles', {
            url: '/roles',
            views: {
                'employee': {
                    templateUrl: 'src/modules/trackr/administration/employees/rolesList.tpl.html',
                    controller: 'trackr.administration.controllers.employees.roles-list'
                }
            },
            needsAuthority: 'ROLE_ADMIN'
        })
        .state('trackr.administration.projects', {
            url: '/projects',
            views: {
                'center@': {
                    templateUrl: 'src/modules/trackr/administration/projects/list.tpl.html',
                    controller: 'trackr.administration.controllers.projects.list'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        })
        .state('trackr.administration.projects.edit', {
            url: '/{id:[\\w\\.]+}',
            views: {
                'project': {
                    templateUrl: 'src/modules/trackr/administration/projects/edit.tpl.html',
                    controller: 'trackr.administration.controllers.projects.edit'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        });
    }]);

    controllers.init(administration);
    return administration;
});