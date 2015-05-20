define(['lodash', './lodashHelpers', './sortHelper'], function(_, LodashHelpers, SortHelper) {
    'use strict';
    var expensesDebitorController = function($scope, Restangular, $filter, intervalLocationService) {
        var controller = this;

        // see date-interval directive
        $scope.dateSelected = function(start, end) {
            intervalLocationService.saveIntervalToLocation(start, end);
            controller.loadTravelExpenseReports(start, end);
        };

        // See table-sort directive
        $scope.sortBy = function(property, direction) {
            SortHelper.sortArrayOfArrays($scope.travelExpenseReports, property, direction);
        };

        /**
         * Load all travel expenses for the given period and generate the chart data.
         * @param {Date} start The start of the period
         * @param {Date} end The end of the period
         */
        controller.loadTravelExpenseReports = function(start, end) {
            Restangular.allUrl('travelExpenseReports', 'api/travelExpenseReports/search/findBySubmissionDateBetween')
                .getList({
                    start: start.getTime(),
                    end: end.getTime(),
                    projection: 'withExpensesAndDebitor'
                }).then(function(reports) {
                    // Filter out the rejected travel expense reports, they are not relevant for this report
                    var submittedAndApprovedReports = _.filter(reports, function(report) {
                        return report.status !== 'REJECTED';
                    });

                    $scope.travelExpenseReports = controller.mapAndReduceTravelExpenseReports(submittedAndApprovedReports);
                    SortHelper.sortArrayOfArrays($scope.travelExpenseReports, 1, 1);
                    $scope.barChartData = controller.calculateBarChartData($scope.travelExpenseReports);
                });
        };

        /**
         * Just invokes {@link mapAndReduceValuesToSum} with a key and number mapper.
         * @param {Array} travelExpenseReports raw array of travel expense reports
         * @return {Array} The array like it is returned from {@link mapAndReduceValuesToSum}.
         */
        controller.mapAndReduceTravelExpenseReports = function(travelExpenseReports) {
            function debitorMapper(report) {
                return report.debitor.name;
            }

            // For each travel expense report we have to add the sum of all its expenses. The, below, we will add
            // up all those sums for all travel expense reports belonging to an employee.
            function expensesSumMapper(report) {
                return _.reduce(report.expenses, function(sum, expense) {
                    return sum + expense.cost;
                }, 0);
            }

            return LodashHelpers.mapAndReduceValuesToSum(travelExpenseReports, debitorMapper, expensesSumMapper);
        };

        /**
         * Generate the data for the bar chart. Works on the data returned by {@link mapAndReduceValuesToSum}
         * @param travelExpenseArray The array with the data for travel expenses.
         * @return {{series: Array, data: Object}} Data for angular-charts to display.
         */
        controller.calculateBarChartData = function(travelExpenseArray) {
            var data = [
                {
                    x: $filter('translate')('PAGES.REPORTR.TRAVEL_EXPENSE.EXPENSES'),
                    y: []
                }
            ];
            var series = [];
            travelExpenseArray.forEach(function(travelExpense) {
                series.push(travelExpense[0]);
                data[0].y.push(travelExpense[1]);
            });
            return {
                series: series,
                data: data
            };
        };

        $scope.barChartData = { series: [], data: [] };

        $scope.barChartConfig = {
            tooltips: true,
            labels: false,
            legend: {
                display: true,
                position: 'left'
            }
        };

        $scope.interval = intervalLocationService.loadIntervalFromLocation();
        controller.loadTravelExpenseReports($scope.interval.start, $scope.interval.end);
    };
    expensesDebitorController.$inject = ['$scope', 'Restangular', '$filter', 'reportr.intervalLocationService'];
    return expensesDebitorController;
});