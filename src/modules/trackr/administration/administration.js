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
        .state('trackr.administration.roles', {
            url: '/roles',
            views: {
                'center@': {
                    templateUrl: '/src/modules/trackr/administration/partials/roles/edit.tpl.html',
                    controller: 'trackr.administration.controllers.roles.edit'
                }
            },
            needsAuthority: 'ROLE_ADMIN'
        });
    }]);

    controllers.init(administration);
    return administration;
});