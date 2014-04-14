define(['lodash'], function(_) {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.travelExpense', 'trackr.services.travelExpenseReport', 'report',
        function($scope, Restangular, TravelExpenseService, TravelExpenseReportService, report) {
            $scope.totalCost = 0;
            $scope.report = report;

            /**
             * Recalculate the sum of the cost of the expenses
             * @param  expenses An array of expenses, each must have the properyt "cost".
             * @return The sum of all costs.
             */
            function recalculateTotal(expenses) {
                return expenses.reduce(function(prev, expense) {
                    return prev + parseFloat(expense.cost);
                }, 0);
            }

            /**
             * Add the expenses to the report.
             */
            report.one('expenses').getList().then(function(expenses) {
                report.expenses = expenses;
                $scope.totalCost = recalculateTotal(expenses);
            });

            TravelExpenseService.getTypes().then(function(response) {
                $scope.types = response.data;
            });

            $scope.expense = {};
            $scope.errors = [];

            $scope.editable = function(report) {
                return report.status === 'PENDING' || report.status === 'REJECTED';
            };

            /**
             * Remove an expense from the report. Calls the backend.
             * @param expense The expense to remove.
             */
            $scope.removeExpense = function(expense) {
                Restangular.oneUrl('travelExpenses/' + expense.id).remove().then(function() {
                    _.remove($scope.report.expenses, function(e) {
                        return e.id == expense.id;
                    });
                    $scope.totalCost = recalculateTotal($scope.report.expenses);
                });
            };

            /**
             * Callback for when one of the expenses has its cost edited.
             */
            $scope.costEdited = function() {
                $scope.totalCost = recalculateTotal($scope.report.expenses);
            };

            /**
             * Add a new expense to the report. Calls the backend.
             *
             * Will automatically set the submission date and report ref.
             *
             * Will add the cost of the expense to the totalCost scope variable.
             * @param expense The expense to add.
             * @param report The report to add the expense to.
             */
            $scope.addNewExpense = function(expense, report) {
                expense.report = report._links.self.href;
                expense.submissionDate = new Date();
                Restangular.all('travelExpenses').post(expense).then(function(expense) {
                    report.expenses.push(expense);
                    $scope.totalCost = $scope.totalCost + parseFloat(expense.cost);
                    $scope.errors = [];
                    $scope.expense = {};
                }, function(response) {
                    $scope.errors = response.data.errors;
                });
            };

            /**
             * Sets the status of the report to submitted.
             * @param travelExpenseReport
             */
            $scope.submitReport = function(travelExpenseReport) {
                TravelExpenseReportService.submit(travelExpenseReport).then(function() {
                    report.status = 'SUBMITTED';
                });
            };
        }];
});