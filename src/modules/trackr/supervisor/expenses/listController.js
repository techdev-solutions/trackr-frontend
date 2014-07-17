define([], function() {
    'use strict';
    return ['$scope', 'trackr.services.travelExpenseReport', function($scope, TravelExpenseReportService) {
        TravelExpenseReportService.findByStatusWithEmployee('SUBMITTED').then(function(reports) {
            $scope.reports = reports;
        });
        TravelExpenseReportService.findByStatusWithEmployee('APPROVED').then(function(reports) {
            $scope.approvedReports = reports;
        });
    }];
});