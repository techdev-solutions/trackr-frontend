define(['lodash', 'moment'], function(_, moment) {
    'use strict';
    return ['$scope', 'Restangular', 'base.services.user', 'base.services.confirmation-dialog',
        function($scope, Restangular, UserService, ConfirmationDialogService) {
            var controller = this;
            $scope.month = moment().startOf('month');
            //This needs to be a scope variable because the datepicker changes it, so a constant is not useable in the template.
            $scope.datepickerMode = 'month';

            $scope.monthChange = function() {
                controller.showMonth($scope.month);
            };

            /**
             * Load the work times of one month, put them in the scope and calculate the grouped worktimes.
             * @param date The month to load.
             */
            controller.showMonth = function(date) {
                Restangular.allUrl('workTimes', 'api/workTimes/search/findByEmployeeAndDateBetweenOrderByDateAscStartTimeAsc')
                    .getList({
                        employee: UserService.getUser().id,
                        start: moment(date).format('YYYY-MM-DD'),
                        end: moment(date).endOf('month').format('YYYY-MM-DD'),
                        projection: 'withProject'
                    }).then(function(workTimes) {
                        //Add the difference of end - start to all workTimes since it will be needed at several places
                        _.forEach(workTimes, function(workTime) {
                            workTime.totalHours = controller.totalHours(workTime.endTime, workTime.startTime);
                        });
                        $scope.groupedWorkTimes = controller.convertToGroupedWorktimes(workTimes);
                        $scope.workTimes = workTimes;
                    });
            };

            /**
             * Calculate the difference in hours between end and start.
             * @param endTime A string representing a time in the format HH:mm:ss
             * @param startTime A string representing a time in the format HH:mm:ss
             * @returns {*} The difference end - start with decimals (e.g. 8.5)
             */
            controller.totalHours = function(endTime, startTime) {
                var momentStart = moment(startTime, 'HH:mm:ss');
                var momentEnd = moment(endTime, 'HH:mm:ss');
                return momentEnd.diff(momentStart, 'hours', true);
            };

            $scope.remove = function(workTime) {
                function deleteWorkTime() {
                    workTime.remove().then(function() {
                        _.remove($scope.workTimes, {id: workTime.id});
                    });
                }

                ConfirmationDialogService.openConfirmationDialog('ACTIONS.REALLY_DELETE').result.then(deleteWorkTime);
            };

            /**
             * Transform an array of workTimes to a mapping of project ID to an object like this:
             * {
             *  projectName: 'Some project',
             *  totalHours: 120, <-- aggregated hours for the whole month
             *  companyName: 'Some company'
             * }
             *
             * Loads the company name via an extra request.
             * @param workTimes The array to convert
             * @returns {{}}
             */
            controller.convertToGroupedWorktimes = function(workTimes) {
                var out = {};
                _.forEach(workTimes, function(workTime) {
                    if(out[workTime.project.id]) {
                        out[workTime.project.id].totalHours += workTime.totalHours;
                    } else {
                        out[workTime.project.id] = {
                            totalHours: workTime.totalHours,
                            projectName: workTime.project.name
                        };
                        Restangular.one('projects', workTime.project.id).one('company').get().then(function(company) {
                            out[workTime.project.id].companyName = company.name;
                        });
                    }
                });
                return out;
            };

            controller.showMonth($scope.month);
        }];
});