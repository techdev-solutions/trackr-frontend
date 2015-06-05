define(['angular',
    'modules/reportr/revenueController',
    'modules/reportr/vacationController',
    'modules/reportr/projectHoursController',
    'modules/reportr/employeeHoursController',
    'modules/reportr/travelExpenseController',
    'modules/reportr/expensesDebitorController',
    'modules/reportr/sickDaysController',
    './intervalLocationService',
    './charts/chartsModule'
], function(angular, RevenueController, VacationController, ProjectHoursController, EmployeeHoursController, TravelExpenseController, ExpensesDebitorController, SickDaysController, intervalLocationService) {
    'use strict';
    var reportr = angular.module('reportr', ['charts']);

    reportr.controller('reportr.controllers.revenue', RevenueController);
    reportr.controller('reportr.controllers.vacation', VacationController);
    reportr.controller('reportr.controllers.project-hours', ProjectHoursController);
    reportr.controller('reportr.controllers.employee-hours', EmployeeHoursController);
    reportr.controller('reportr.controllers.travel-expense', TravelExpenseController);
    reportr.controller('reportr.controllers.expenses-debitor', ExpensesDebitorController);
    reportr.controller('reportr.controllers.sick-days', SickDaysController);

    reportr.service('reportr.intervalLocationService', intervalLocationService);
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
                needsAuthority: 'ROLE_ADMIN'
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
                url: '/project_hours',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/reportr/project-hours.tpl.html',
                        controller: 'reportr.controllers.project-hours'
                    }
                }
            })
            .state('app.reportr.employee-hours', {
                url: '/employee_hours',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/reportr/employee-hours.tpl.html',
                        controller: 'reportr.controllers.employee-hours'
                    }
                }
            })
            .state('app.reportr.travel-expense', {
                url: '/travel_expenses',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/reportr/travel-expense.tpl.html',
                        controller: 'reportr.controllers.travel-expense'
                    }
                }
            })
            .state('app.reportr.sick-days', {
                url: '/sick-days',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/reportr/sick-days.tpl.html',
                        controller: 'reportr.controllers.sick-days'
                    }
                }
            })
            .state('app.reportr.expenses-debitor', {
                url: '/expenses-debitor',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/reportr/expenses-debitor.tpl.html',
                        controller: 'reportr.controllers.expenses-debitor'
                    }
                }
            });
    }]);

    return reportr;
});
