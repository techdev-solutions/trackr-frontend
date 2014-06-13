define(['angular', 'modules/trackr/supervisor/controllers'], function(angular, controllers) {
    'use strict';
    var supervisor = angular.module('trackr.supervisor', []);

    supervisor.config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('trackr.supervisor', {
                url: '/supervisor',
                breadcrumbTranslateCode: 'PAGES.SUPERVISOR.TITLE',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/supervisor/supervisor.tpl.html'
                    }
                }
            })
            .state('trackr.supervisor.bill', {
                url: '/bill',
                breadcrumbTranslateCode: 'PAGES.SUPERVISOR.BILL.TITLE',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/supervisor/fileBillableHours.tpl.html',
                        controller: 'trackr.supervisor.controllers.file-billable-hours'
                    }
                }
            })
            .state('trackr.supervisor.bill.report', {
                url: '/report',
                breadcrumbTranslateCode: 'PAGES.SUPERVISOR.BILL_CREATE.TITLE',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/supervisor/billReport.tpl.html',
                        controller: 'trackr.supervisor.controllers.bill-report'
                    }
                }
            })
            .state('trackr.supervisor.vacation', {
                url: '/vacation',
                breadcrumbTranslateCode: 'PAGES.SUPERVISOR.VACATION.TITLE',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/supervisor/vacation/vacation.tpl.html',
                        controller: 'trackr.supervisor.controllers.vacation'
                    }
                }
            })
            .state('trackr.supervisor.expenses', {
                url: '/expenses',
                breadcrumbTranslateCode: 'PAGES.SUPERVISOR.TRAVEL_EXPENSE_REPORTS.TITLE',
                resolve: {
                    reports: ['trackr.services.travelExpenseReport', function(TravelExpenseReportService) {
                        return TravelExpenseReportService.findByStatusWithEmployee('SUBMITTED');
                    }],
                    approvedReports: ['trackr.services.travelExpenseReport', function(TravelExpenseReportService) {
                        return TravelExpenseReportService.findByStatusWithEmployee('APPROVED');
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
                breadcrumbTranslateCode: 'ACTIONS.EDIT',
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