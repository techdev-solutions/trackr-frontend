define(['moment', './lodashHelpers', './sortHelper'], function(moment, LodashHelpers, SortHelper) {
    'use strict';
    var projectHoursController = function($scope, Restangular, $filter, intervalLocationService) {
        var controller = this;

        // see date-interval directive
        $scope.dateSelected = function(start, end) {
            intervalLocationService.saveIntervalToLocation(start, end);
            controller.loadAllTimes(start, end);
        };

        // See table-sort directive
        $scope.sortBy = function(property, direction) {
            SortHelper.sortArrayOfArrays($scope.projectTimes, property, direction);
        };

        /**
         * Extract the project name + identifier from a work time or billable time.
         * @param {Object} obj work time or billable time
         * @return {string} project name + (project identifier)
         */
        controller.projectIdentifier = function(obj) {
            return obj.project.name + ' (' + obj.project.identifier + ')';
        };

        /**
         * Load billable times or work times from the backend, run {@link mapAndReduceValuesToSum} on the result.
         * @param {Date} start The start of the period to load
         * @param {Date} end The end of the period to load
         * @param {String} name either 'workTimes' or 'billableTimes'
         * @param {Function} numberExtractor The numberExtractor to reduce the hours, function from workTime or billableTime to number.
         * @return {*} A promise resolving to the array containing the values.
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

        /**
         * Invoke {@link loadTimes} for billableTimes
         */
        controller.loadBillableTimes = function(start, end) {
            return controller.loadTimes(start, end, 'billableTimes', function(billableTime) {
                return parseFloat(moment.duration(billableTime.minutes, 'minutes').asHours().toFixed(2));
            });
        };

        /**
         * Invoke {@link loadTimes} for workTimes
         */
        controller.loadWorkTimes = function(start, end) {
            return controller.loadTimes(start, end, 'workTimes', function(workTime) {
                return moment(workTime.endTime, 'HH:mm').diff(moment(workTime.startTime, 'HH:mm'), 'hours', true);
            });
        };

        /**
         * Generate the data for the bar chart. Works on the data returned by {@link mapAndReduceValuesToSum}
         * @param {Array} timesArray The array with the data for the work times and billable times
         * @return {{labels: Array, datasets: Array}} Data for the barchart directive to display.
         */
        controller.calculateChartData = function(timesArray) {
            var trackedHours = [];
            var billedHours = [];
            var data = {
                // labels will contain the projects
                labels: [],
                // datasets is 0: tracked hours, 1: billed hours
                datasets: [{
                    label: $filter('translate')('PAGES.REPORTR.PROJECT_HOURS.TRACKED_HOURS'),
                    data: trackedHours
                },
                {
                    label: $filter('translate')('PAGES.REPORTR.PROJECT_HOURS.BILLED_HOURS'),
                    data: billedHours
                }]
            };

            timesArray.forEach(function(timeData) {
                data.labels.push(timeData[0]);
                trackedHours.push(timeData[2]);
                billedHours.push(timeData[1]);
            });
            return data;
        };

        /**
         * Extract the billable time for a project from the billable times array.
         * @param {Array} billableTimesArray Array of the format [ ['project1', 40], ['project2', 100] ]
         * @param {String} projectName The name of the project to extract
         * @return {Number} The hours billed for the project or 0 if it does not exist.
         */
        controller.findBillableTime = function(billableTimesArray, projectName) {
            for (var i = 0; i < billableTimesArray.length; i++) {
                if (billableTimesArray[i][0] === projectName) {
                    return billableTimesArray[i][1];
                }
            }
            return 0;
        };

        /**
         * Load billable times and work times for the period. Generate the data for the bar chart.
         *
         * @param {Date} start The start of the period
         * @param {Date} end The end of the period
         */
        controller.loadAllTimes = function(start, end) {
            var billableTimes;
            controller.loadBillableTimes(start, end)
                .then(function(billableTimesArray) {
                    billableTimes = billableTimesArray;
                    return controller.loadWorkTimes(start, end);
                })
                .then(function(workTimesArray) {
                    // Add the billable times next to the work times so we get an array of the format
                    // [ ['project1', 100, 90], ['project2', 150, 140] ]
                    workTimesArray.forEach(function(workTimeData) {
                        var projectName = workTimeData[0];
                        workTimeData[2] = controller.findBillableTime(billableTimes, projectName);
                    });
                    $scope.barChartData = controller.calculateChartData(workTimesArray);
                    //TODO: check for billable times without work times?
                    SortHelper.sortArrayOfArrays(workTimesArray, 2, 1);
                    $scope.projectTimes = workTimesArray;
                });
        };

        $scope.barChartData = {
            labels: [],
            datasets: []
        };

        $scope.interval = intervalLocationService.loadIntervalFromLocation();
        controller.loadAllTimes($scope.interval.start, $scope.interval.end);
    };
    projectHoursController.$inject = ['$scope', 'Restangular', '$filter', 'reportr.intervalLocationService'];
    return projectHoursController;
});