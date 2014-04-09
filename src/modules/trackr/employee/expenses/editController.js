define([], function() {
    'use strict';
    return ['$scope', 'Restangular', '$stateParams', function($scope, Restangular, $stateParams) {
        Restangular.one('travelExpenseReports', $stateParams.id).get().then(function(report) {
            report.one('expenses').getList().then(function(expenses) {
                report.expenses = expenses;
                $scope.report = report;
            });
        });
    }];
});