define(['angular', 'modules/trackr/administration/controllers', './employees/adminEmployeeModule'], function(angular, controllers) {
    'use strict';
    var administration = angular.module('trackr.administration', ['trackr.administration.employees']);

    administration.config(['$stateProvider', function($stateProvider) {
        $stateProvider
        .state('app.trackr.administration', {
            url: '/administration',
            breadcrumbTranslateCode: 'PAGES.ADMINISTRATION.TITLE',
            views: {
                'center@app': {
                    templateUrl: 'src/modules/trackr/administration/administration.tpl.html'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        })
        .state('app.trackr.administration.companies', {
            url: '/companies',
            breadcrumbTranslateCode: 'COMPANY.COMPANIES',
            views: {
                'center@app': {
                    templateUrl: 'src/modules/trackr/administration/companies/list.tpl.html',
                    controller: 'trackr.administration.controllers.companies.list'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        })
        .state('app.trackr.administration.companies.edit', {
            url: '/{id:[\\d]+}',
            views: {
                'company': {
                    templateUrl: 'src/modules/trackr/administration/companies/display.tpl.html',
                    controller: 'trackr.administration.controllers.companies.display'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        })
        .state('app.trackr.administration.projects', {
            url: '/projects',
            breadcrumbTranslateCode: 'PROJECT.PROJECTS',
            views: {
                'center@app': {
                    templateUrl: 'src/modules/trackr/administration/projects/list.tpl.html',
                    controller: 'trackr.administration.controllers.projects.list'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        })
        .state('app.trackr.administration.projects.edit', {
            url: '/{id:[\\w\\.]+}',
            views: {
                'project': {
                    templateUrl: 'src/modules/trackr/administration/projects/display.tpl.html',
                    controller: 'trackr.administration.controllers.projects.display'
                }
            },
            needsAuthority: 'ROLE_SUPERVISOR'
        });
    }]);

    controllers.init(administration);
    return administration;
});