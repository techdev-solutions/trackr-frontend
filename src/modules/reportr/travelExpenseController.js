define(['lodash', 'moment', 'modules/shared/utils/lodashHelpers', 'modules/reportr/sortHelper'], function(_, moment, LodashHelpers, SortHelper) {
    'use strict';
    return ['$scope', 'Restangular', '$filter', function($scope, Restangular, $filter) {
        var controller = this;

        $scope.dateSelected  = function(start, end) {
            controller.loadTravelExpenseReports(start, end);
        };

        $scope.sortBy = function(property, direction) {
            SortHelper.sortArrayOfArrays($scope.travelExpenseReports, property, direction);
        };

        controller.loadTravelExpenseReports = function(start, end) {
            Restangular.allUrl('travelExpenseReports', 'api/travelExpenseReports/search/findBySubmissionDateBetween')
                .getList({
                    start: start.getTime(),
                    end: end.getTime(),
                    projection: 'withEmployeeAndExpenses'
                }).then(function(reports) {
                    var submittedAndApprovedReports = _.filter(reports, function(report) {
                        return report.status !== 'REJECTED';
                    });

                    function employeeMapper(report) {
                        return report.employee.firstName + ' ' + report.employee.lastName;
                    }

                    function expensesSumMapper(report) {
                        return _.reduce(report.expenses, function(sum, expense) {
                            return sum + expense.cost;
                        }, 0);
                    }

                    var travelExpenseReportsMap = LodashHelpers.mapAndReduceValuesToSum(submittedAndApprovedReports, employeeMapper, expensesSumMapper);
                    $scope.travelExpenseReports = _.pairs(travelExpenseReportsMap);
                    SortHelper.sortArrayOfArrays($scope.travelExpenseReports, 1, 1);
                    $scope.barChartData = controller.calculateBarChartData(travelExpenseReportsMap);
                });
        };

        controller.calculateBarChartData = function(travelExpenseMap) {
            var data = [{
                x: $filter('translate')('PAGES.REPORTR.TRAVEL_EXPENSE.EXPENSES'),
                y: []
            }];
            var series = [];
            _.forIn(travelExpenseMap, function(expenses, employee) {
                series.push(employee);
                data[0].y.push(expenses);
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

        controller.loadTravelExpenseReports(moment().startOf('month').toDate(), moment().endOf('month').toDate());
    }];
});