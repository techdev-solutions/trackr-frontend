define(['lodash'], function(_) {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.travelExpenseReport', 'expenseTypes',
        '$filter', 'base.services.confirmation-dialog', '$stateParams', 'shared.services.create-or-update-modal', '$state',
        'base.services.notification',
        function($scope, Restangular, TravelExpenseReportService, expenseTypes, $filter, ConfirmationDialogService, $stateParams, createOrUpdateModalService, $state,
                 NotificationService) {
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
                projection: 'withExpensesAndDebitorAndProject'
            })
                .then(function(report) {
                    return report.all('comments').getList({
                        projection: 'withEmployee'
                    }).then(function(comments) {
                        report.comments = comments;
                        return report;
                    });
                })
                .then(function(report) {
                    $scope.report = report;
                    $scope.report.statusTranslateCode = 'TRAVEL_EXPENSE_REPORT.' + report.status;
                    $scope.totalCost = controller.recalculateTotal(report.expenses);
                });

            $scope.expenseTypes = expenseTypes;
            $scope.comment = {};
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
             * Checks if a report is deletable. It is when it is pending.
             * @param report The report to check
             * @return {boolean} true if the report is deletable.
             */
            $scope.deletable = function(report) {
                return report !== undefined && (report.status === 'PENDING' || report.status === 'REJECTED');
            };

            /**
             * Remove an expense from the report. Calls the backend.
             * @param expense The expense to remove.
             */
            $scope.removeExpense = function(expense) {
                function deleteExpense() {
                    Restangular.one('travelExpenses', expense.id).remove().then(function() {
                        _.remove($scope.report.expenses, {id: expense.id});
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
                    .showModal('trackr.employee.controllers.expense-edit as ctrl',
                    'src/modules/trackr/employee/expenses/expense-edit.tpl.html',
                    'ACTIONS.EDIT', {
                        expense: expense,
                        expenseTypes: $scope.expenseTypes
                    });

                $modalInstance.result.then(function(editedExpense) {
                    var index = _.findIndex($scope.report.expenses, {id: editedExpense.id });
                    $scope.report.expenses[index] = editedExpense;
                    $scope.totalCost = controller.recalculateTotal($scope.report.expenses);
                });
            };

            /**
             * Sets the status of the report to submitted.
             * @param travelExpenseReport
             */
            $scope.submitReport = function(travelExpenseReport) {
                TravelExpenseReportService.submit(travelExpenseReport).then(function() {
                    $scope.report.status = 'SUBMITTED';
                });
            };

            /**
             * Delete a report. If successful change to the overview state for reports.
             * @param travelExpenseReport
             */
            $scope.deleteReport = function(travelExpenseReport) {
                travelExpenseReport.remove().then(function() {
                    $state.go('app.trackr.employee.expenses');
                }, function(response) {
                    if (response.status === 403) {
                        NotificationService.error($filter('translate')('PAGES.EMPLOYEE.EXPENSES.DELETE_FORBIDDEN'));
                    } else {
                        NotificationService.fatal($filter('translate')('ERRORS.FAILED_REQUEST'));
                    }

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

            /**
             * Preprocessor for comment-section.
             */
            $scope.addReport = function(comment) {
                comment.travelExpenseReport = $scope.report._links.self.href;
                return comment;
            };

            $scope.$on('newExpense', function(event, expense) {
                event.stopPropagation();
                $scope.report.expenses.push(expense);
                $scope.totalCost = $scope.totalCost + parseFloat(expense.cost);
            });
        }];
});