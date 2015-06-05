define(['angular', './controllers', 'moment', './expenses/employeeExpensesModule'], function(angular, controllers, moment) {
    'use strict';
    var employee = angular.module('trackr.employee', ['trackr.employee.expenses']);
    employee.config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('app.trackr.employee', {
                url: '/employee',
                breadcrumbTranslateCode: 'PAGES.EMPLOYEE.TITLE',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/employee/employee.tpl.html'
                    }
                }
            })
            .state('app.trackr.employee.self', {
                url: '/self',
                breadcrumbTranslateCode: 'PAGES.EMPLOYEE.TEXT_EDIT_PROFILE',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/employee/self.tpl.html',
                        controller: 'trackr.employee.controllers.self'
                    }
                }
            })
            .state('app.trackr.employee.timesheet', {
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
                    'center@app': {
                        templateUrl: 'src/modules/trackr/employee/timesheet/timesheet.tpl.html',
                        controller: 'trackr.employee.controllers.timesheet'
                    }
                }
            })
            .state('app.trackr.employee.timesheet.overview', {
                url: '/overview',
                breadcrumbTranslateCode: 'PAGES.EMPLOYEE.TEXT_TIMESHEET_OVERVIEW',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/employee/timesheet/timesheetOverview.tpl.html',
                        controller: 'trackr.employee.controllers.timesheet-overview'
                    }
                }
            })
            .state('app.trackr.employee.vacation', {
                url: '/vacation',
                breadcrumbTranslateCode: 'PAGES.EMPLOYEE.TEXT_VACATION',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/employee/vacation/list.tpl.html',
                        controller: 'trackr.employee.controllers.vacation-list'
                    },
                    'new@app.trackr.employee.vacation': {
                        templateUrl: 'src/modules/trackr/employee/vacation/new.tpl.html',
                        controller: 'trackr.employee.controllers.vacation-new'
                    }
                }
            })
            .state('app.trackr.employee.address_book', {
                url: '/address_book',
                breadcrumbTranslateCode: 'PAGES.EMPLOYEE.ADDRESS_BOOK.TITLE',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/employee/address_book/address_book.tpl.html',
                        controller: 'trackr.employee.controllers.address_book'
                    }
                }
            })
            .state('app.trackr.employee.sick-days', {
                url: '/sick-days',
                breadcrumbTranslateCode: 'PAGES.EMPLOYEE.SICK_DAYS.TITLE',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/employee/sick_days/sick-days.tpl.html',
                        controller: 'trackr.employee.controllers.sick-days'
                    }
                }
            });
    }]);

    controllers.init(employee);
    return employee;
});