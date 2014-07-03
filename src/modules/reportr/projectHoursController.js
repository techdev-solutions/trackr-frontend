define(['lodash', 'moment', 'modules/shared/utils/lodashHelpers'], function(_, moment, LodashHelpers) {
    'use strict';
    return ['$scope', 'Restangular', '$filter', function($scope, Restangular, $filter) {
        var controller = this;

        $scope.dateSelected = function(start, end) {
            controller.loadAllTimes(start, end);
        };

        /**
         * Extract the project name + identifier from a work time or billable time.
         * @param obj work time or billable time
         * @return {string} project name + (project identifier)
         */
        controller.projectIdentifier = function(obj) {
            return obj.project.name + ' (' + obj.project.identifier + ')';
        };

        /**
         * Load billable times or work times from the backend, group them by project and reduce the hours to a single value.
         * @param {Date} start The start of the period to load
         * @param {Date} end The end of the period to load
         * @param {String} name either workTimes or billableTimes
         * @param {Function} numberExtractor The numberExtractor to reduce the hours, function from workTime or billableTime to number.
         * @return {*} The promise from the http call.
         */
        controller.loadTimes = function(start, end, name, numberExtractor) {
            return Restangular.allUrl(name, 'api/' + name + '/search/findByDateBetween')
                .getList({
                    start: start.getTime(),
                    end: end.getTime(),
                    projection: 'withProject'
                }
            ).then(function(times) {
                    return LodashHelpers.mapAndReduceValuesToSum(times, controller.projectIdentifier, numberExtractor);
                });
        };

        controller.loadBillableTimes = function(start, end) {
            return controller.loadTimes(start, end, 'billableTimes', function(billableTime) {
                return moment.duration(billableTime.minutes, 'minutes').asHours();
            });
        };

        controller.loadWorkTimes = function(start, end) {
            return controller.loadTimes(start, end, 'workTimes', function(workTime) {
                return moment(workTime.endTime, 'HH:mm').diff(moment(workTime.startTime, 'HH:mm'), 'hours', true);
            });
        };

        controller.calculateChartData = function(workTimesMap, billableTimesMap) {
            var data = [];
            _.forIn(workTimesMap, function(hours, project) {
                data.push({
                    x: project,
                    y: [hours, billableTimesMap[project]]
                });

            });
            return data;
        };

        /**
         * Load billable times and work times. Calculate the data for the chart.
         */
        controller.loadAllTimes = function(start, end) {
            controller.loadBillableTimes(start, end)
                .then(function(billableTimesMap) {
                    $scope.billableTimes = billableTimesMap;
                    return controller.loadWorkTimes(start, end);
                })
                .then(function(workTimesMap) {
                    $scope.workTimes = workTimesMap;
                    $scope.barChartData.data = controller.calculateChartData($scope.workTimes, $scope.billableTimes);
                });
        };

        $scope.barChartData = {
            series: [
                $filter('translate')('PAGES.REPORTR.PROJECT_HOURS.TRACKED_HOURS'),
                $filter('translate')('PAGES.REPORTR.PROJECT_HOURS.BILLED_HOURS')
            ],
            data: []
        };

        $scope.barChartConfig = {
            tooltips: true,
            labels: false,
            legend: {
                display: true,
                position: 'left'
            }
        };

        controller.loadAllTimes(moment().startOf('month').toDate(), moment().endOf('month').toDate());
    }];
});