define(['lodash', 'moment'], function(_, moment) {
    'use strict';
    return ['$scope', 'Restangular', '$filter', function($scope, Restangular, $filter) {
        var controller = this;

        $scope.dateSelected = function(start, end) {
            controller.loadAllTimes(start, end);
        };

        /**
         * Group the elements of the array by their calculated project identifier and reduce the values with the
         * reducer callback.
         * @param {Array} arr array with either workTimes or billableHours
         * @param {Function} reducer callback for _.reduce taking the current sum and the current value as arguments
         * @return {Object} Map of project identifiers to hours
         */
        controller.groupByProjectAndReduceHours = function(arr, reducer) {
            var mapped = _.groupBy(arr, controller.projectIdentifier);
            return _.mapValues(
                mapped,
                function(values) {
                    var hours = _.reduce(values, reducer, 0);
                    // Somehow in some cases angular-charts does not like strings so we have to convert to a number
                    // after truncating to two decimal places.
                    return parseFloat(hours.toFixed(2));
                }
            );
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
         * @param {Function} reducer The reducer to reduce the hours
         * @return {*} The promise from the http call.
         */
        controller.loadTimes = function(start, end, name, reducer) {
            return Restangular.allUrl(name, 'api/' + name + '/search/findByDateBetween')
                .getList({
                    start: start.getTime(),
                    end: end.getTime(),
                    projection: 'withProject'
                }
            ).then(function(times) {
                    $scope[name] = controller.groupByProjectAndReduceHours(times, reducer);
                });
        };

        controller.loadBillableTimes = function(start, end) {
            return controller.loadTimes(start, end, 'billableTimes', function(sum, billableTime) {
                return sum + moment.duration(billableTime.minutes, 'minutes').asHours();
            });
        };

        controller.loadWorkTimes = function(start, end) {
            return controller.loadTimes(start, end, 'workTimes', function(sum, workTime) {
                var diff = moment(workTime.endTime, 'HH:mm').diff(moment(workTime.startTime, 'HH:mm'), 'hours', true);
                return sum + diff;
            });
        };

        /**
         * Load billable times and work times. Calculate the data for the chart.
         */
        controller.loadAllTimes = function(start, end) {
            controller.loadBillableTimes(start, end)
                .then(function() {
                    return controller.loadWorkTimes(start, end);
                })
                .then(function() {
                    var data = [];
                    _.forIn($scope.workTimes, function(hours, project) {
                        data.push({
                            x: project,
                            y: [hours, $scope.billableTimes[project]]
                        });

                    });
                    $scope.barChartData.data = data;
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