define(['angular'], function(angular) {
    'use strict';
    var configFn = [];
    var reportr = angular.module('reportr', configFn);

    reportr.config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('app.reportr', {
                url: 'reportr',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/reportr/reportr.tpl.html'
                    },
                    'top-menu@app': {
                        templateUrl: 'src/modules/reportr/top-menu.tpl.html',
                        controller: 'base.controllers.navigation'
                    }
                },
                needsAuthority: 'ROLE_SUPERVISOR'
            })
            .state('app.reportr.revenue', {
                url: '/revenue'
            })
            .state('app.reportr.vacation', {
                url: '/vacation'
            })
            .state('app.reportr.project-hours', {
                url: '/project_hours'
            })
            .state('app.reportr.employee-hours', {
                url: '/employee_hours'
            })
            .state('app.reportr.travel-expense', {
                url: '/travel_expenses'
            });
    }]);

    return reportr;
});