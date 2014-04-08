define([], function() {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.employee', function($scope, Restangular, EmployeeService) {
        Restangular.allUrl('travelExpenseReports', '/api/travelExpenseReports/search/findByEmployee')
            .getList({employee: EmployeeService.getEmployee().id}).then(function(reports) {
                $scope.reports = reports;
            });
    }];
});