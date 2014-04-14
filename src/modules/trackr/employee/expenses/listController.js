define([], function() {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.employee', '$state', function($scope, Restangular, EmployeeService, $state) {
        Restangular.allUrl('travelExpenseReports', 'api/travelExpenseReports/search/findByEmployeeOrderByStatusAsc')
            .getList({employee: EmployeeService.getEmployee().id}).then(function(reports) {
                $scope.reports = reports;
            });

        $scope.acceptedSubmittedAndRejected = function(travelExpenseReport) {
            return travelExpenseReport.status === 'REJECTED' ||
                travelExpenseReport.status === 'ACCEPTED' ||
                travelExpenseReport.status === 'SUBMITTED';
        };

        /**
         * Add a new travel expense report and immediately switch to it.
         */
        $scope.addNew = function() {
            var newReport = {
                employee: EmployeeService.getEmployeeHref(),
                status: 'PENDING'
            };
            Restangular.all('travelExpenseReports').post(newReport).then(function(report) {
                $state.go('trackr.employee.expenses.edit', {id: report.id});
            });
        };
    }];
});