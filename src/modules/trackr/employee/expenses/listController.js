define(['modules/shared/PaginationLoader', 'lodash'], function(PaginationLoader, _) {
    'use strict';
    return ['$scope', 'Restangular', '$state', 'employee', 'shared.services.create-or-update-modal', function($scope, Restangular, $state, employee, CreateOrUpdateModalService) {
        var controller = this;
        $scope.states = ['PENDING', 'REJECTED', 'APPROVED', 'SUBMITTED'];
        $scope.reports = {};
        var paginationLoader = new PaginationLoader(Restangular.allUrl('travelExpenseReports', 'api/travelExpenseReports/search/findByEmployeeAndStatusOrderByStatusAsc'),
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
            var params = {
                projection: 'overview',
                employee: employee.id
            };
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