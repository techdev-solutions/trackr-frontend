define(['angular', 'modules/trackr/employee/controllers', 'moment'], function(angular, controllers, moment) {
    'use strict';
    var employee = angular.module('trackr.employee', []);
    employee.config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('trackr.employee', {
                url: '/employee',
                breadcrumbTranslateCode: 'PAGES.EMPLOYEE.TITLE',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/employee/employee.tpl.html'
                    }
                }
            })
            .state('trackr.employee.self', {
                url: '/self',
                breadcrumbTranslateCode: 'PAGES.EMPLOYEE.TEXT_EDIT_PROFILE',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/employee/self.tpl.html',
                        controller: 'trackr.employee.controllers.self'
                    }
                }
            })
            .state('trackr.employee.timesheet', {
                url: '/timesheet',
                breadcrumbTranslateCode: 'PAGES.EMPLOYEE.TEXT_EDIT_TIMESHEET',
                resolve: {
                    holidays: ['employee', 'Restangular', function(employee, Restangular) {
                        var start = moment().startOf('year');
                        var end = moment().endOf('year').add('month', 1);
                        return Restangular.allUrl('holidays', 'api/holidays/search/findByFederalStateAndDayBetween')
                            .getList({
                                state: employee.federalState.name,
                                start: start.format('YYYY-MM-DD'),
                                end: end.format('YYYY-MM-DD')
                            });
                    }]
                },
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/employee/timesheet/timesheet.tpl.html',
                        controller: 'trackr.employee.controllers.timesheet'
                    }
                }
            })
            .state('trackr.employee.timesheet.overview', {
                url: '/overview',
                breadcrumbTranslateCode: 'PAGES.EMPLOYEE.TEXT_TIMESHEET_OVERVIEW',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/employee/timesheet/timesheetOverview.tpl.html',
                        controller: 'trackr.employee.controllers.timesheet-overview'
                    }
                }
            })
            .state('trackr.employee.vacation', {
                url: '/vacation',
                breadcrumbTranslateCode: 'PAGES.EMPLOYEE.TEXT_VACATION',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/employee/vacation/list.tpl.html',
                        controller: 'trackr.employee.controllers.vacation-list'
                    },
                    'new@trackr.employee.vacation': {
                        templateUrl: 'src/modules/trackr/employee/vacation/new.tpl.html',
                        controller: 'trackr.employee.controllers.vacation-new'
                    }
                }
            })
            .state('trackr.employee.expenses', {
                url: '/expenses',
                breadcrumbTranslateCode: 'PAGES.EMPLOYEE.TEXT_EXPENSES',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/employee/expenses/list.tpl.html',
                        controller: 'trackr.employee.controllers.expenseReport-list'
                    }
                }
            })
            .state('trackr.employee.expenses.edit', {
                url: '/{id:\\d+}',
                breadcrumbTranslateCode: 'ACTIONS.EDIT',
                resolve: {
                    expenseTypes: ['trackr.services.travelExpense', function(TravelExpenseService) {
                        return TravelExpenseService.getTypes();
                    }]
                },
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/employee/expenses/edit.tpl.html',
                        controller: 'trackr.employee.controllers.expenseReport-edit'
                    }
                }
            });
    }]);

    controllers.init(employee);
    return employee;
});