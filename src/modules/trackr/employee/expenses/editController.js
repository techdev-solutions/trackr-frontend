define(['lodash'], function(_) {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.travelExpenseReport', 'report', 'expenses', 'expenseTypes',
        '$filter', 'base.services.confirmation-dialog',
        function($scope, Restangular, TravelExpenseReportService, report, expenses, expenseTypes, $filter, ConfirmationDialogService) {
            var controller = this;
            /**
             * Recalculate the sum of the cost of the expenses
             * @param  expenses An array of expenses, each must have the property "cost".
             * @return The sum of all costs.
             */
            controller.recalculateTotal = function(expenses) {
                return expenses.reduce(function(prev, expense) {
                    return prev + parseFloat(expense.cost);
                }, 0);
            };

            $scope.report = report;
            $scope.expenseTypes = expenseTypes;
            $scope.totalCost = controller.recalculateTotal(expenses);
            $scope.expense = {};
            $scope.errors = [];

            /**
             * Report is editable if report.status == PENDING || REJECTED
             * @param report The report to check
             * @returns {boolean} If the report is editable
             */
            $scope.editable = function(report) {
                return report.status === 'PENDING' || report.status === 'REJECTED';
            };

            /**
             * Remove an expense from the report. Calls the backend.
             * @param expense The expense to remove.
             */
            $scope.removeExpense = function(expense) {
                function deleteExpense() {
                    Restangular.one('travelExpenses', expense.id).remove().then(function() {
                        _.remove($scope.report.expenses, function(e) {
                            return e.id == expense.id;
                        });
                        $scope.totalCost = controller.recalculateTotal($scope.report.expenses);
                    });
                }

                ConfirmationDialogService.openConfirmationDialog('ACTIONS.REALLY_DELETE').result.then(deleteExpense);
            };

            /**
             * Callback for when one of the expenses has its cost edited.
             */
            $scope.costEdited = function() {
                $scope.totalCost = controller.recalculateTotal($scope.report.expenses);
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

            /**
             * Translate the travel expense type from its enum value.
             * @param type The enum value (e.g. TAXI)
             * @returns {*} The translation (e.g. Taxi)
             */
            $scope.translateTravelExpenseType = function(type) {
                return $filter('translate')('TRAVEL_EXPENSE.TYPE_VALUES.' + type);
            };
        }];
});