define(['modules/shared/PaginationLoader', 'lodash'], function(PaginationLoader, _) {
    'use strict';
    return ['$scope', 'Restangular', function($scope, Restangular) {
        var controller = this;
        $scope.states = ['SUBMITTED', 'APPROVED'];
        $scope.reports = {};
        var paginationLoader = new PaginationLoader(Restangular.allUrl('travelExpenseReports', 'api/travelExpenseReports/search/findByStatusOrderByEmployee_LastNameAsc'),
            'reports', '', $scope, 10);

        paginationLoader.afterObjectsGet = function(reports, state) {
            reports.forEach(function(report) {
                report.total = controller.calculateReportTotal(report);
            });
            $scope.reports[state] = reports;
        };

        /**
         * Add up all expense costs in the report
         * @param {Object} report The report to calculate the total sum of
         * @return {Number} Summed up costs of expenses.
         */
        controller.calculateReportTotal = function(report) {
            return _.reduce(report.expenses, function(sum, val) {
                return sum + val.cost;
            }, 0);
        };

        controller.loadPage = function(page, state) {
            var params = { projection: 'overview' };
            if (state) {
                params.status = state;
                paginationLoader.loadPage(page, params, state);
            } else {
                for (var i = 0; i < $scope.states.length; i++) {
                    params.status = $scope.states[i];
                    paginationLoader.loadPage(page, params, $scope.states[i]);
                }
            }
        };

        $scope.setPage = function(state) {
            controller.loadPage($scope.reports[state].page.number, state);
        };

        controller.loadPage(1);
    }];
});