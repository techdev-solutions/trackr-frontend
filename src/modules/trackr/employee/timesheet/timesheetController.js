define([], function() {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.employee', '$filter', 'base.services.notification',
        function($scope, Restangular, EmployeeService, $filter, NotificationService) {
            var controller = this;
            var today = new Date();
            $scope.date = today;
            $scope.startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0, 0);
            $scope.endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 30, 0);

            $scope.errors = [];

            $scope.getProjects = function(searchString) {
                var search = '%' + searchString + '%';
                return Restangular.allUrl('projects', 'api/projects/search/findByNameLikeOrIdentifierLikeOrderByNameAsc').getList({name: search, identifier: search});
            };

            controller.formatTime = function(date) {
                return $filter('date')(date, 'HH:mm:ss');
            };

            controller.createWorkTimeEntity = function() {
                var project;
                if ($scope.project) {
                    project = $scope.project._links.self.href;
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

            $scope.saveTime = function() {
                var workTimeObject = controller.createWorkTimeEntity();
                Restangular.all('workTimes').post(workTimeObject).then(function() {
                    $scope.errors = [];
                    NotificationService.info('Working time saved.');
                }, function(response) {
                    $scope.errors = response.data.errors;
                    NotificationService.error('Error saving working time');
                });
            };
        }];
});