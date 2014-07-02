define(['angular',
    'modules/reportr/revenueController',
    'modules/reportr/vacationController',
    'angular-charts'
], function(angular, RevenueController, VacationController) {
    'use strict';
    var configFn = ['angularCharts'];
    var reportr = angular.module('reportr', configFn);

    reportr.controller('reportr.controllers.revenue', RevenueController);
    reportr.controller('reportr.controllers.vacation', VacationController);

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
                url: '/revenue',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/reportr/revenue.tpl.html',
                        controller: 'reportr.controllers.revenue'
                    }
                }
            })
            .state('app.reportr.vacation', {
                url: '/vacation',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/reportr/vacation.tpl.html',
                        controller: 'reportr.controllers.vacation'
                    }
                }
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