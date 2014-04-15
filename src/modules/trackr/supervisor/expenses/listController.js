define([], function() {
    'use strict';
    return ['$scope', 'reports', 'approvedReports', function($scope, reports, approvedReports) {
        $scope.reports = reports;
        $scope.approvedReports = approvedReports;
    }];
});