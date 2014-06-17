define([], function() {
    'use strict';
    return ['$scope', 'Restangular', '$state', 'employee', function($scope, Restangular, $state, employee) {
        Restangular.allUrl('travelExpenseReports', 'api/travelExpenseReports/search/findByEmployeeOrderByStatusAsc')
            .getList({employee: employee.id}).then(function(reports) {
                $scope.reports = reports;
            });

        $scope.acceptedSubmittedAndRejected = function(travelExpenseReport) {
            return travelExpenseReport.status === 'REJECTED' ||
                travelExpenseReport.status === 'APPROVED' ||
                travelExpenseReport.status === 'SUBMITTED';
        };

        /**
         * Add a new travel expense report and immediately switch to it.
         */
        $scope.addNew = function() {
            var newReport = {
                employee: employee._links.self.href,
                status: 'PENDING'
            };
            Restangular.all('travelExpenseReports').post(newReport).then(function(report) {
                $state.go('trackr.employee.expenses.edit', {id: report.id});
            });
        };
    }];
});