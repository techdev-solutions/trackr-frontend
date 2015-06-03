define(['angular', './controllers', './expenses/supervisorExpensesModule'], function(angular, controllers) {
    'use strict';
    var supervisor = angular.module('trackr.supervisor', ['trackr.supervisor.expenses']);

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
            });
    }]);

    controllers.init(supervisor);
    return supervisor;
});