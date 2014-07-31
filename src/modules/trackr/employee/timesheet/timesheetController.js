define(['moment', 'lodash'], function(moment, _) {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.employee', '$filter', 'base.services.notification', 'holidays',
        function($scope, Restangular, EmployeeService, $filter, NotificationService, holidays) {
            var controller = this;
            $scope.date = moment().toDate();
            $scope.startTime = moment().hour(9).minute(0).second(0).toDate();
            $scope.endTime = moment().hour(17).minute(30).second(0).toDate();

            $scope.errors = [];

            $scope.getProjects = function(searchString) {
                var search = '%' + searchString + '%';
                return Restangular
                    .allUrl('projects', 'api/projects/search/findByNameLikeIgnoreCaseOrIdentifierLikeIgnoreCaseOrderByNameAsc')
                    .getList({name: search, identifier: search, projection: 'withCompanyAndDebitor'});
            };

            $scope.getProjectLabel = function(project) {
                if(project) {
                    return project.name + ' (' + project.company.name + ')';
                }
            };

            controller.formatTime = function(date) {
                return $filter('date')(date, 'HH:mm:ss');
            };

            /**
             * Calculates the difference of end - start in hours (with decimals).
             * @param endTime a date or string parseable by moment.js
             * @param startTime a date or string parseable by moment.js
             * @returns {*} The difference between end and start in hours (e.g. 8.5)
             */
            $scope.totalTime = function(endTime, startTime) {
                var end = moment(endTime).startOf('minute');
                var start = moment(startTime).startOf('minute');
                return end.diff(start, 'hours', true);
            };

            controller.createWorkTimeEntity = function() {
                return {
                    employee: EmployeeService.getEmployeeHref(),
                    project: $scope.project._links.self.href,
                    date: $scope.date,
                    startTime: controller.formatTime($scope.startTime),
                    endTime: controller.formatTime($scope.endTime),
                    comment: $scope.comment
                };
            };

            /**
             * Advance to the next monday-friday that is not a public holiday.
             * @param date The date to advance
             * @returns {date|*} The date advanced to the next day.
             */
            controller.advanceToNextWorkDay = function(date) {
                var mdate = moment(date).add('days', 1);
                while(!controller.isWorkDay(mdate, holidays)) {
                    mdate.add('days', 1);
                }
                return mdate.toDate();
            };

            /**
             * Test if a day is a work day given a list of public holidays.
             * @param date The date to test
             * @param holidays A list of public holidays
             * @returns {boolean} true if the date is a monday-friday that is not in the list, false otherwise.
             */
            controller.isWorkDay = function(date, holidays) {
                return date.day() !== 6 && date.day() !== 0 && !_.find(holidays, function(holiday) {
                    return holiday.day === date.format('YYYY-MM-DD');
                });
            };

            $scope.saveTime = function() {
                var workTimeObject = controller.createWorkTimeEntity();
                Restangular.all('workTimes').post(workTimeObject).then(function() {
                    $scope.errors = [];
                    $scope.date = controller.advanceToNextWorkDay($scope.date);
                    NotificationService.info('Working time saved.');
                }, function(response) {
                    $scope.errors = response.data.errors;
                    NotificationService.error('Error saving working time');
                });
            };
        }];
});