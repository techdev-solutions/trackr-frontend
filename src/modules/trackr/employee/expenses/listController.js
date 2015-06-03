define(['modules/shared/PaginationLoader', 'lodash'], function(PaginationLoader, _) {
    'use strict';
    return ['$scope', 'Restangular', '$state', 'employee', 'shared.services.create-or-update-modal', function($scope, Restangular, $state, employee, CreateOrUpdateModalService) {
        var controller = this;
        $scope.states = ['PENDING', 'REJECTED', 'APPROVED', 'SUBMITTED'];
        $scope.reports = {};
        var paginationLoader = new PaginationLoader(Restangular.allUrl('travelExpenseReports', 'api/travelExpenseReports/search/findByEmployeeAndStatusOrderByStatusAsc'),
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
            var params = {
                projection: 'overview',
                employee: employee.id
            };

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

        /**
         * Add a new travel expense report and immediately switch to it.
         */
        $scope.addNew = function() {
            var $modalInstance = CreateOrUpdateModalService
                .showModal('trackr.employee.expenses.expenseReportNewController as ctrl',
                'src/modules/trackr/employee/expenses/report-new.tpl.html',
                'TRAVEL_EXPENSE_REPORT.TRAVEL_EXPENSE_REPORT');

            $modalInstance.result.then(function(report) {
                $state.go('app.trackr.employee.expenses.edit', {id: report.id});
            });
        };

        controller.loadPage(1);
    }];
});