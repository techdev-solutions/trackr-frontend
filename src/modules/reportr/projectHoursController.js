define(['lodash', 'moment', 'modules/shared/utils/lodashHelpers', 'modules/reportr/sortHelper'], function(_, moment, LodashHelpers, SortHelper) {
    'use strict';
    return ['$scope', 'Restangular', '$filter', function($scope, Restangular, $filter) {
        var controller = this;

        $scope.dateSelected = function(start, end) {
            controller.loadAllTimes(start, end);
        };

        $scope.sortBy = function(property, direction) {
            SortHelper.sortArrayOfArrays($scope.projectTimes, property, direction);
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
                return parseFloat(moment.duration(billableTime.minutes, 'minutes').asHours().toFixed(2));
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
            var billableTimes;
            controller.loadBillableTimes(start, end)
                .then(function(billableTimesMap) {
                    billableTimes = billableTimesMap;
                    return controller.loadWorkTimes(start, end);
                })
                .then(function(workTimesMap) {
                    $scope.barChartData.data = controller.calculateChartData(workTimesMap, billableTimes);

                    var workTimeArray = _.pairs(workTimesMap);
                    // Add the billable times if present
                    workTimeArray.forEach(function(workTimeData) {
                        var projectName = workTimeData[0];

                        if(billableTimes[projectName]) {
                            workTimeData[2] = billableTimes[projectName];
                        } else {
                            workTimeData[2] = 0;
                        }
                    });
                    //TODO: check for billable times without worktimes?
                    SortHelper.sortArrayOfArrays(workTimeArray, 2, 1);
                    $scope.projectTimes = workTimeArray;
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