define(['lodash'], function(_) {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.travelExpenseReport', 'expenseTypes',
        '$filter', 'base.services.confirmation-dialog', '$stateParams', 'shared.services.create-or-update-modal',
        function($scope, Restangular, TravelExpenseReportService, expenseTypes, $filter, ConfirmationDialogService, $stateParams, createOrUpdateModalService) {
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

            Restangular.one('travelExpenseReports', $stateParams.id).get({
                projection: 'withExpenses'
            }).then(function(report) {
                $scope.report = report;
                $scope.report.statusTranslateCode = 'TRAVEL_EXPENSE_REPORT.' + report.status;
                $scope.totalCost = controller.recalculateTotal(report.expenses);
            });

            $scope.expenseTypes = expenseTypes;
            $scope.expense = {};
            $scope.errors = [];

            /**
             * Report is editable if report.status == PENDING || REJECTED
             * @param report The report to check
             * @returns {boolean} If the report is editable
             */
            $scope.editable = function(report) {
                return report !== undefined && (report.status === 'PENDING' || report.status === 'REJECTED');
            };

            /**
             * Remove an expense from the report. Calls the backend.
             * @param expense The expense to remove.
             */
            $scope.removeExpense = function(expense) {
                function deleteExpense() {
                    Restangular.one('travelExpenses', expense.id).remove().then(function() {
                        _.remove($scope.report.expenses, function(e) {
                            return e.id === expense.id;
                        });
                        $scope.totalCost = controller.recalculateTotal($scope.report.expenses);
                    });
                }

                ConfirmationDialogService.openConfirmationDialog('ACTIONS.REALLY_DELETE').result.then(deleteExpense);
            };

            /**
             * Opens the edit form for a single expense and updates the list if the user edited the expense.
             * @param expense
             */
            $scope.showEditForm = function(expense) {
                var $modalInstance = createOrUpdateModalService
                    .showModal('trackr.employee.controllers.expense-edit',
                    'src/modules/trackr/employee/expenses/expense-edit.tpl.html',
                    'ACTIONS.EDIT', {
                        expense: expense,
                        expenseTypes: $scope.expenseTypes
                    });

                $modalInstance.result.then(function(editedExpense) {
                    var index = _.findIndex($scope.report.expenses, function(ex) {
                        return ex.id === editedExpense.id;
                    });
                    $scope.report.expenses[index] = editedExpense;
                    $scope.totalCost = controller.recalculateTotal($scope.report.expenses);
                });
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
                    $scope.report.status = 'SUBMITTED';
                    $scope.report.statusTranslateCode = 'TRAVEL_EXPENSE_REPORT.SUBMITTED';
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