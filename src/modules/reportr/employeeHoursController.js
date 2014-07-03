define(['lodash', 'moment', 'modules/shared/utils/lodashHelpers', 'modules/reportr/sortHelper'], function(_, moment, LodashHelpers, SortHelper) {
    'use strict';
    return ['$scope', 'Restangular', '$filter', function($scope, Restangular, $filter) {
        var controller = this;

        $scope.dateSelected = function(start, end) {
            controller.loadWorkTimes(start, end);
        };

        $scope.sortBy = function(property, direction) {
            SortHelper.sortArrayOfArrays($scope.workTimes, property, direction);
        };

        controller.loadWorkTimes = function(start, end) {
            return Restangular.allUrl('workTimes', 'api/workTimes/search/findByDateBetween')
                .getList({
                    start: start.getTime(),
                    end: end.getTime(),
                    projection: 'withEmployee'
                }
            ).then(function(times) {
                    var workTimesMap = controller.mapAndReduceWorkTimes(times);
                    $scope.barChartData = controller.calculateBarChartData(workTimesMap);
                    $scope.workTimes = _.pairs(workTimesMap);
                    SortHelper.sortArrayOfArrays($scope.workTimes, 1, 1);
                });
        };

        controller.mapAndReduceWorkTimes = function(workTimes) {
            function employeeMapper(workTime) {
                return workTime.employee.firstName + ' ' + workTime.employee.lastName;
            }
            function hoursMapper(workTime) {
                return moment(workTime.endTime, 'HH:mm').diff(moment(workTime.startTime, 'HH:mm'), 'hours', true);
            }
            return LodashHelpers.mapAndReduceValuesToSum(workTimes, employeeMapper, hoursMapper);
        };

        controller.calculateBarChartData = function(workTimesMap) {
            var data = [{
                x: $filter('translate')('PAGES.REPORTR.EMPLOYEE_HOURS.WORKED_HOURS'),
                y: []
            }];
            var series = [];
            _.forIn(workTimesMap, function(hours, employee) {
                series.push(employee);
                data[0].y.push(hours);
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

        controller.loadWorkTimes(moment().startOf('month').toDate(), moment().endOf('month').toDate());
    }];
});