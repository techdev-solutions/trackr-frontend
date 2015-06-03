define(['./expensesDecorator'], function(expensesDecorator) {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.travelExpenseReport', '$filter', '$stateParams', '$state',
        'base.services.notification',
        function($scope, Restangular, TravelExpenseReportService, $filter, $stateParams, $state, NotificationService) {

            Restangular.one('travelExpenseReports', $stateParams.id).get({
                projection: 'overview'
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
                    expensesDecorator($scope.report.expenses);
                    $scope.report.statusTranslateCode = 'TRAVEL_EXPENSE_REPORT.' + report.status;
                });

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
             * Preprocessor for comment-section.
             */
            $scope.addReport = function(comment) {
                comment.travelExpenseReport = $scope.report._links.self.href;
                return comment;
            };

            $scope.$on('newExpense', function(event, expense) {
                $scope.report.expenses.push(expense);
            });
        }];
});