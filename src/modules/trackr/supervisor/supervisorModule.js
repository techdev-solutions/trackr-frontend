define(['angular', 'modules/trackr/supervisor/controllers'], function(angular, controllers) {
    'use strict';
    var supervisor = angular.module('trackr.supervisor', []);

    supervisor.config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('app.trackr.supervisor', {
                url: '/supervisor',
                breadcrumbTranslateCode: 'PAGES.SUPERVISOR.TITLE',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/supervisor/supervisor.tpl.html'
                    }
                }
            })
            .state('app.trackr.supervisor.bill', {
                url: '/bill',
                breadcrumbTranslateCode: 'PAGES.SUPERVISOR.BILL.TITLE',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/supervisor/fileBillableHours.tpl.html',
                        controller: 'trackr.supervisor.controllers.file-billable-hours'
                    }
                }
            })
            .state('app.trackr.supervisor.bill.report', {
                url: '/report',
                breadcrumbTranslateCode: 'PAGES.SUPERVISOR.BILL_CREATE.TITLE',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/supervisor/billReport.tpl.html',
                        controller: 'trackr.supervisor.controllers.bill-report'
                    }
                }
            })
            .state('app.trackr.supervisor.vacation', {
                url: '/vacation',
                breadcrumbTranslateCode: 'PAGES.SUPERVISOR.VACATION.TITLE',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/supervisor/vacation/vacation.tpl.html',
                        controller: 'trackr.supervisor.controllers.vacation'
                    }
                }
            })
            .state('app.trackr.supervisor.expenses', {
                url: '/expenses',
                breadcrumbTranslateCode: 'PAGES.SUPERVISOR.TRAVEL_EXPENSE_REPORTS.TITLE',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/supervisor/expenses/list.tpl.html',
                        controller: 'trackr.supervisor.controllers.expenseReport-list'
                    }
                }
            })
            .state('app.trackr.supervisor.expenses.edit', {
                url: '/{id:\\d+}',
                breadcrumbTranslateCode: 'ACTIONS.EDIT',
                resolve: {
                    report: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
                        return Restangular.one('travelExpenseReports', $stateParams.id)
                            .get({
                                projection: 'overview'
                            });
                    }],
                    expenses: ['report', function(report) {
                        return report.one('expenses').getList().then(function(expenses) {
                            report.expenses = expenses;
                            return expenses;
                        });
                    }]
                },
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/supervisor/expenses/edit.tpl.html',
                        controller: 'trackr.supervisor.controllers.expenseReport-edit'
                    }
                }
            });
    }]);

    controllers.init(supervisor);
    return supervisor;
});