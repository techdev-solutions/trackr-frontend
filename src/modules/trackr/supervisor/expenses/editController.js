define([], function() {
        'use strict';
        return ['$scope', 'Restangular', 'trackr.services.travelExpenseReport', '$state', 'base.services.user', '$stateParams',
            function($scope, Restangular, TravelExpenseReportService, $state, UserService, $stateParams) {

                Restangular.one('travelExpenseReports', $stateParams.id)
                    .get({
                        projection: 'withEmployeeAndExpenses'
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
                        $scope.totalCost = recalculateTotal(report.expenses);
                    });

                /**
                 * Recalculate the sum of the cost of the expenses
                 * @param  expenses An array of expenses, each must have the property "cost".
                 * @return The sum of all costs.
                 */
                function recalculateTotal(expenses) {
                    return expenses.reduce(function(prev, expense) {
                        return prev + parseFloat(expense.cost);
                    }, 0);
                }

                $scope.report = {};
                $scope.principal = UserService.getUser();

                $scope.accept = function(report) {
                    TravelExpenseReportService.approve(report).then(function() {
                        $state.go('app.trackr.supervisor.expenses', null, { reload: true });
                    });
                };

                $scope.reject = function(report) {
                    TravelExpenseReportService.reject(report).then(function() {
                        $state.go('app.trackr.supervisor.expenses', null, { reload: true });
                    });
                };

                $scope.addReport = function(comment) {
                    comment.travelExpenseReport = $scope.report._links.self.href;
                    return comment;
                };

            }
        ];
    }
);