define(['angular', 'modules/trackr/supervisor/controllers'], function(angular, controllers) {
    'use strict';
    var supervisor = angular.module('trackr.supervisor', []);

    supervisor.config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('trackr.supervisor', {
                url: '/supervisor',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/supervisor/supervisor.tpl.html'
                    }
                }
            })
            .state('trackr.supervisor.bill', {
                url: '/bill',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/supervisor/fileBillableHours.tpl.html',
                        controller: 'trackr.supervisor.controllers.file-billable-hours'
                    }
                }
            })
            .state('trackr.supervisor.bill.report', {
                url: '/report',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/supervisor/billReport.tpl.html',
                        controller: 'trackr.supervisor.controllers.bill-report'
                    }
                }
            })
            .state('trackr.supervisor.vacation', {
                url: '/vacation',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/supervisor/vacation/vacation.tpl.html',
                        controller: 'trackr.supervisor.controllers.vacation'
                    }
                }
            })
            .state('trackr.supervisor.expenses', {
                url: '/expenses',
                resolve: {
                    reports: ['Restangular', function(Restangular) {
                        return Restangular.allUrl('travelExpenseReports', 'api/travelExpenseReports/search/findByStatusOrderByEmployee_LastNameAsc').getList({
                            status: 'SUBMITTED'
                        }).then(function(reports) {
                            reports.forEach(function(report) {
                                Restangular.oneUrl('travelExpenseReports', report._links.self.href).one('employee').get().then(function(employee) {
                                    report.employee = employee;
                                });
                            });
                            return reports;
                        });
                    }]
                },
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/supervisor/expenses/list.tpl.html',
                        controller: 'trackr.supervisor.controllers.expenseReport-list'
                    }
                }
            })
            .state('trackr.supervisor.expenses.edit', {
                url: '/{id:\\d+}',
                resolve: {
                    report: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
                        return Restangular.one('travelExpenseReports', $stateParams.id).get();
                    }],
                    expenses: ['report', function(report) {
                        return report.one('expenses').getList().then(function(expenses) {
                            report.expenses = expenses;
                            return expenses;
                        });
                    }]
                },
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/supervisor/expenses/edit.tpl.html',
                        controller: 'trackr.supervisor.controllers.expenseReport-edit'
                    }
                }
            });
    }]);

    controllers.init(supervisor);
    return supervisor;
});