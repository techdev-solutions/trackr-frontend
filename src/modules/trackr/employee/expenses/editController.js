define([], function() {
    'use strict';
    return ['$scope', 'Restangular', '$stateParams', '$http', function($scope, Restangular, $stateParams, $http) {
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
        $http.get('api/travelExpenses/types').then(function(response) {
            $scope.types = response.data;
        });

        $scope.expense = {};
        $scope.errors = [];
        $scope.addNew = function() {
            $scope.expense.report = $scope.report._links.self.href;
            $scope.expense.submissionDate = new Date();
            Restangular.all('travelExpenses').post($scope.expense).then(function(expense) {
                $scope.report.expenses.push(expense);
                $scope.totalCost = $scope.totalCost + parseFloat(expense.cost);
                $scope.errors = [];
                $scope.expense = {};
            }, function(response) {
                $scope.errors = response.data.errors;
            });
        };
    }];
});