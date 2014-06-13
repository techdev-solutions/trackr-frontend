define(['moment'], function(moment) {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.employee', '$filter', 'base.services.notification',
        function($scope, Restangular, EmployeeService, $filter, NotificationService) {
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

            controller.createWorkTimeEntity = function() {
                var project;
                if ($scope.project) {
                    project = $scope.project._links.self.href;
                    //This is due to an error in Spring-Data-Rest 2.1 where the self href contains an {?projection} if projections are used.
                    project = project.substr(0, project.indexOf('{'));
                }
                return {
                    employee: EmployeeService.getEmployeeHref(),
                    project: project,
                    date: $scope.date,
                    startTime: controller.formatTime($scope.startTime),
                    endTime: controller.formatTime($scope.endTime),
                    comment: $scope.comment
                };
            };

            /**
             * Advance to the next monday-friday.
             * @param date The date to advance
             * @returns {date|*} The date advanced to the next day.
             */
            controller.advanceToNextWorkDay = function(date) {
                var mdate = moment(date), daysToAdd = 1;
                if(mdate.day() === 6) {
                    //Saturday
                    daysToAdd = 2;
                } else if(mdate.day() === 5) {
                    //Friday
                    daysToAdd = 3;
                }
                return mdate.add('days', daysToAdd).toDate();
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