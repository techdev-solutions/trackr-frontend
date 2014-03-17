define(['angular', 'modules/trackr/supervisor/controllers'], function(angular, controllers) {
    'use strict';
    var supervisor = angular.module('trackr.supervisor', []);

    supervisor.config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('trackr.supervisor', {
                url: '/supervisor',
                views: {
                    'center@': {
                        templateUrl: '/src/modules/trackr/supervisor/supervisor.tpl.html'
                    }
                }
            })
            .state('trackr.supervisor.bill', {
                url: '/bill',
                views: {
                    'center@': {
                        templateUrl: '/src/modules/trackr/supervisor/fileBillableHours.tpl.html',
                        controller: 'trackr.supervisor.controllers.file-billable-hours'
                    }
                }
            })
            .state('trackr.supervisor.bill.report', {
                url: '/report',
                views: {
                    'center@': {
                        templateUrl: '/src/modules/trackr/supervisor/billReport.tpl.html',
                        controller: 'trackr.supervisor.controllers.bill-report'
                    }
                }
            });
    }]);

    controllers.init(supervisor);
    return supervisor;
});