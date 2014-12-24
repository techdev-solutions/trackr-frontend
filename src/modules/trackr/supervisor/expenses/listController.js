define(['modules/shared/PaginationLoader', 'lodash'], function(PaginationLoader, _) {
    'use strict';
    return ['$scope', 'Restangular', '$state', function($scope, Restangular, $state) {
        var controller = this;
        $scope.states = ['SUBMITTED', 'APPROVED'];
        $scope.reports = {};
        var paginationLoader = new PaginationLoader(Restangular.allUrl('travelExpenseReports', 'api/travelExpenseReports/search/findByStatusOrderByEmployee_LastNameAsc'),
            'reports', '', $scope, 10);

        var orderBy = null;
        var isAscendingOrder = true;

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

        /**
         * Load expense reports from the server.
         * @param page The page to load.
         * @param [state] If provided only this specific report state is reloaded (PENDING, REJECTED, APPROVED or SUBMITTED).
         * @param [sort] If provided the returned reports are sorted by the specified column with specified sorting direction
         */
        controller.loadPage = function(page, state, sort) {
            var params = { projection: 'overview' };

            if (sort) {
                params.sort = sort;
            }

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

        /**
         * Load expense reports in the correct sort order, ordered by the chosen property
         * @param state The state the tab belongs to.
         * @param sort Property name to sort the reports.
         * @param [ignoreSameOrderProperty] 'true', if the sorting order has to be ignored (used for pagination calls).
         */
        $scope.loadSortedReports = function(state, sort, ignoreSameOrderProperty) {
            if (!ignoreSameOrderProperty) {
                if (orderBy == sort) {
                    isAscendingOrder = !isAscendingOrder;
                } else {
                    isAscendingOrder = true;
                }
            }
            orderBy = sort;
            var sortingStr = orderBy === null ? null : orderBy + ',' + (isAscendingOrder ? 'asc' : 'desc');
            controller.loadPage($scope.reports[state].page.number, state, sortingStr);
        };

        /**
         * Returns whether the expense reports are sorted by the given property in ascending order.
         * @param property Property name to check.
         * @returns 'true', if reports are sorted by the property above, otherwise 'false'.
         */
        $scope.isSortedAsc = function(property) {
            return orderBy == property && isAscendingOrder;
        };

        /**
         * Returns whether the expense reports are sorted by the given property in ascending order.
         * @param property Property name to check.
         * @returns 'true', if reports are sorted by the property above, otherwise 'false'.
         */
        $scope.isSortedDesc = function(property) {
            return orderBy == property && !isAscendingOrder;
        };

        $scope.setPage = function(state) {
            $scope.loadSortedReports(state, orderBy, true);
        };

        $scope.jumpToReport = function(reportId) {
            $state.go('app.trackr.supervisor.expenses.edit', {id: reportId});
        };

        controller.loadPage(1);
    }];
});