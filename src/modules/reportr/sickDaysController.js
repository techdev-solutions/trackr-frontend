define(['moment', 'modules/reportr/lodashHelpers', 'modules/reportr/sortHelper'], function(moment, LodashHelpers, SortHelper) {
    'use strict';
    return ['$scope', 'Restangular', '$filter', function($scope, Restangular, $filter) {
        var controller = this;

        $scope.dateSelected = function(start, end) {
            controller.loadSickDays(start, end);
        };

        controller.mapAndReduceSickdays= function(rawSickDays) {
            function employeeName(sickDay) {
                return sickDay.employee.firstName + ' ' + sickDay.employee.lastName;
            }

            function sickDayDays(sickDay) {
                if(sickDay.endDate) {
                    return moment(sickDay.endDate).diff(sickDay.startDate, 'days', false);
                } else {
                    return 0;
                }
            }

            return LodashHelpers.mapAndReduceValuesToSum(rawSickDays, employeeName, sickDayDays);
        };

        controller.loadSickDays = function(start, end) {
            Restangular.allUrl('sickDays', 'api/sickDays/search/findByStartDateBetweenOrEndDateBetween')
                .getList({
                    startLower: start.getTime(),
                    startHigher: end.getTime(),
                    endLower: start.getTime(),
                    endHigher: end.getTime(),
                    projection: 'withEmployee'
                })
                .then(function(sickDays) {
                    $scope.sickDays = controller.mapAndReduceSickdays(sickDays);
                    SortHelper.sortArrayOfArrays($scope.sickDays, 1, 1);
                    $scope.barChartData = controller.calculateBarChartData($scope.sickDays);
                });
        };

        /**
         * Generate the data for the bar chart. Works on the data returned by {@link mapAndReduceValuesToSum}
         * @param travelExpenseArray The array with the data for travel expenses.
         * @return {{series: Array, data: Object}} Data for angular-charts to display.
         */
        controller.calculateBarChartData = function(travelExpenseArray) {
            var data = [
                {
                    x: $filter('translate')('SICK_DAYS.TOTAL_DAYS'),
                    y: []
                }
            ];
            var series = [];
            travelExpenseArray.forEach(function(sickDays) {
                series.push(sickDays[0]);
                data[0].y.push(sickDays[1]);
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

        controller.loadSickDays(moment().startOf('month').toDate(), moment().endOf('month').toDate());
    }];
});