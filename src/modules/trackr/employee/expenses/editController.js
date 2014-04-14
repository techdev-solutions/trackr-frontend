define([], function() {
    'use strict';
    return ['$scope', 'Restangular', '$stateParams', 'trackr.services.travelExpense', 'trackr.services.travelExpenseReport',
        function($scope, Restangular, $stateParams, TravelExpenseService, TravelExpenseReportService) {
            var reportBase = Restangular.one('travelExpenseReports', $stateParams.id);
            $scope.totalCost = 0;

            reportBase.get().then(function(report) {
                report.one('expenses').getList().then(function(expenses) {
                    report.expenses = expenses;
                    $scope.totalCost = expenses.reduce(function(prev, expense) {
                        return prev + parseFloat(expense.cost);
                    }, 0);
                    $scope.report = report;
                });
            });

            TravelExpenseService.getTypes().then(function(response) {
                $scope.types = response.data;
            });

            $scope.expense = {};
            $scope.errors = [];

            $scope.editable = function(report) {
                return report.status === 'PENDING' || report.status === 'REJECTED';
            };

            $scope.addNewExpense = function(expense) {
                expense.report = $scope.report._links.self.href;
                expense.submissionDate = new Date();
                Restangular.all('travelExpenses').post(expense).then(function(expense) {
                    $scope.report.expenses.push(expense);
                    $scope.totalCost = $scope.totalCost + parseFloat(expense.cost);
                    $scope.errors = [];
                    $scope.expense = {};
                }, function(response) {
                    $scope.errors = response.data.errors;
                });
            };

            $scope.submitReport = function(travelExpenseReport) {
                TravelExpenseReportService.submit(travelExpenseReport).then(function() {

                });
            };
        }];
});