define(['lodash', 'moment', 'modules/reportr/sortHelper'], function(_, moment, SortHelper) {
    'use strict';
    return ['$http', '$scope', '$filter', function($http, $scope, $filter) {
        var controller = this;

        // see date-interval directive
        $scope.dateSelected = function(start, end) {
            controller.loadVacationRequests(start, end);
        };

        // See table-sort directive
        $scope.sortBy = function(property, direction) {
            SortHelper.sortArrayOfArrays($scope.vacationRequests, property, direction);
        };

        /**
         * Load the vacation requests from start to end. Map them to the desired format which is
         * [ ['employeeName', 3], ['anotherEmployeeName', 5] ]
         * and generate the data for the chart.
         *
         * @param {Date} start The start date of the period
         * @param {Date} end The end date of the period.
         */
        controller.loadVacationRequests = function(start, end) {
            $http.get('api/vacationRequests/daysPerEmployeeBetween', {
                params: {
                    start: start.getTime(),
                    end: end.getTime(),
                    projection: 'withEmployeeAndApprover'
                }
            }).then(function(response) {
                $scope.vacationRequests = _.pairs(response.data);
                SortHelper.sortArrayOfArrays($scope.vacationRequests, 1, 1);
                $scope.barChartData = controller.generateBarChartData($scope.vacationRequests);
            });
        };

        /**
         * Generate the data for the barchart. Works on the data like it is returned by {@link mapAndReduceValuesToSum}.
         * @param {Array} vacationRequestsArray The array with the data for the vacation requests.
         * @return {{series: Array, data: Array}} Data for angular-charts to display.
         */
        controller.generateBarChartData = function(vacationRequestsArray) {
            var data = [];
            var series = [];
            vacationRequestsArray.forEach(function(vacationRequest) {
                if (vacationRequest[1] > 0) {
                    series.push(vacationRequest[0]);
                    data.push(vacationRequest[1]);
                }
            });
            return {
                labels: series,
                datasets: [{
                    label: $filter('translate')('PAGES.REPORTR.VACATION.DAYS'),
                    data: data
                }]
            };
        };

        $scope.barChartData = { labels: [], datasets: [] };

        controller.loadVacationRequests(moment().startOf('month').toDate(), moment().endOf('month').toDate());
    }];
});