define(['lodash', 'moment', 'modules/reportr/sortHelper'], function(_, moment, SortHelper) {
    'use strict';
    return ['$http', '$scope', '$filter', function($http, $scope, $filter) {
        var controller = this;

        $scope.dateSelected = function(start, end) {
            controller.loadVacationRequests(start, end);
        };

        $scope.sortBy = function(property, direction) {
            SortHelper.sortArrayOfArrays($scope.vacationRequests, property, direction);
        };

        /**
         * Load the vacation requests from startDate to endDate.
         *
         * @param {Date} startDate
         * @param {Date} endDate
         */
        controller.loadVacationRequests = function(startDate, endDate) {
            $http.get('api/vacationRequests/daysPerEmployeeBetween', {
                params: {
                    start: startDate.getTime(),
                    end: endDate.getTime(),
                    projection: 'withEmployeeAndApprover'
                }
            }).then(function(response) {
                $scope.vacationRequests = _.pairs(response.data);
                SortHelper.sortArrayOfArrays($scope.vacationRequests, 1, 1);
                var data = [{
                    x: $filter('translate')('PAGES.REPORTR.VACATION.DAYS'),
                    y: []
                }];
                var series = [];
                _.forIn(response.data, function(days, employeeName) {
                    // days can be 0 if the employee has a vacation request that has a cut with the period but only weekends/holidays in the current period
                    if(days > 0) {
                        series.push(employeeName);
                        data[0].y.push(days);
                    }
                });
                $scope.barChartData.data = data;
                $scope.barChartData.series = series;
            });
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

        controller.loadVacationRequests(moment().startOf('month').toDate(), moment().endOf('month').toDate());
    }];
});