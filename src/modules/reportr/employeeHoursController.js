define(['moment', './lodashHelpers', './sortHelper'], function(moment, LodashHelpers, SortHelper) {
    'use strict';
    var employeeHoursController = function($scope, Restangular, $filter, intervalLocationService) {
        var controller = this;

        // see date-interval directive
        $scope.dateSelected = function(start, end) {
            intervalLocationService.saveIntervalToLocation(start, end);
            controller.loadWorkTimes(start, end);
        };

        // See table-sort directive
        $scope.sortBy = function(property, direction) {
            SortHelper.sortArrayOfArrays($scope.workTimes, property, direction);
        };

        /**
         * Load all work times for the given interval and generate the chart data.
         * @param {Date} start The start of the period
         * @param {Date} end The end of the period
         */
        controller.loadWorkTimes = function(start, end) {
            Restangular.allUrl('workTimes', 'api/workTimes/search/findByDateBetween')
                .getList({
                    start: start.getTime(),
                    end: end.getTime(),
                    projection: 'withEmployee'
                }
            ).then(function(times) {
                    $scope.workTimes = controller.mapAndReduceWorkTimes(times);
                    $scope.barChartData = controller.calculateBarChartData($scope.workTimes);
                    SortHelper.sortArrayOfArrays($scope.workTimes, 1, 1);
                });
        };

        /**
         * Just invokes {@link mapAndReduceValuesToSum} with a key and number mapper.
         * @param {Array} workTimes The array of raw work times.
         * @return {Array} The array like it is returned from {@link mapAndReduceValuesToSum}.
         */
        controller.mapAndReduceWorkTimes = function(workTimes) {
            // Use the full employee name as the key
            function employeeMapper(workTime) {
                return workTime.employee.firstName + ' ' + workTime.employee.lastName;
            }

            // Use the difference in hours as the number
            function hoursMapper(workTime) {
                return moment(workTime.endTime, 'HH:mm').diff(moment(workTime.startTime, 'HH:mm'), 'hours', true);
            }

            return LodashHelpers.mapAndReduceValuesToSum(workTimes, employeeMapper, hoursMapper);
        };

        /**
         * Generate the data for the bar chart. Works on the data returned by {@link mapAndReduceValuesToSum}
         * @param {Array} workTimesArray The array with the data for the work times
         * @return {{series: Array, data: Array}} Data for angular-charts to display.
         */
        controller.calculateBarChartData = function(workTimesArray) {
            var data = [];
            var series = [];
            workTimesArray.forEach(function(workTime) {
                series.push(workTime[0]);
                data.push(workTime[1]);
            });
            return {
                labels: series,
                datasets: [{
                    label: $filter('translate')('PAGES.REPORTR.EMPLOYEE_HOURS.WORKED_HOURS'),
                    data: data
                }]
            };
        };

        $scope.barChartData = { labels: [], datasets: [] };

        $scope.interval = intervalLocationService.loadIntervalFromLocation();
        controller.loadWorkTimes($scope.interval.start, $scope.interval.end);
    };
    employeeHoursController.$inject = ['$scope', 'Restangular', '$filter', 'reportr.intervalLocationService'];
    return employeeHoursController;
});