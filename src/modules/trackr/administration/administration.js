define(['angular', 'modules/trackr/administration/controllers/controllers'], function(angular, controllers) {
    'use strict';
    var administration = angular.module('trackr.administration', []);

    administration.config(['$stateProvider', function($stateProvider) {
        $stateProvider
        .state('trackr.administration', {
            url: '/administration',
            views: {
                'center@': {
                    templateUrl: '/src/modules/trackr/administration/partials/administration.tpl.html'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        })
        .state('trackr.administration.companies', {
            url: '/companies',
            views: {
                'center@': {
                    templateUrl: '/src/modules/trackr/administration/partials/companies/list.tpl.html',
                    controller: 'trackr.administration.controllers.companies.list'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        })
        .state('trackr.administration.companies.edit', {
            url: '/{id:[\\w\\.]+}',
            views: {
                'company': {
                    templateUrl: '/src/modules/trackr/administration/partials/companies/edit.tpl.html',
                    controller: 'trackr.administration.controllers.companies.edit'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        })
        .state('trackr.administration.employees', {
            url: '/employees',
            views: {
                'center@': {
                    templateUrl: '/src/modules/trackr/administration/partials/employees/list.tpl.html',
                    controller: 'trackr.administration.controllers.employees.list'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        }).state('trackr.administration.employees.edit', {
            url: '/{id:[\\d]+}',
            views: {
                'employee': {
                    templateUrl: '/src/modules/trackr/administration/partials/employees/edit.tpl.html',
                    controller: 'trackr.administration.controllers.employees.edit'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        }).state('trackr.administration.employees.roles', {
            url: '/roles',
            views: {
                'employee': {
                    templateUrl: '/src/modules/trackr/administration/partials/employees/rolesList.tpl.html',
                    controller: 'trackr.administration.controllers.employees.roles-list'
                }
            },
            needsAuthority: 'ROLE_ADMIN'
        });
    }]);

    controllers.init(administration);
    return administration;
});