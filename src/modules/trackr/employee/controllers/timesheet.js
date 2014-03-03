define([], function() {
    'use strict';
    return ['$scope', 'Restangular', 'base.services.user', function($scope, Restangular, UserService) {
        $scope.date = new Date();
        var startTime = new Date();
        startTime.setSeconds(0);
        startTime.setMinutes(0);
        startTime.setHours(9);
        $scope.startTime = startTime;
        var endTime = new Date();
        endTime.setHours(17);
        endTime.setMinutes(30);
        endTime.setSeconds(0);
        $scope.endTime = endTime;

        $scope.openDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        $scope.dateOptions = {
            'year-format': '\'yyyy\'',
            'starting-day': 1
        };

        $scope.errors = {};

        Restangular.all('projects').getList().then(function(projects) {
            $scope.projects = projects;
        });

        var employee;
        Restangular.one('employees', UserService.getUser().id).get().then(function(_employee) {
            employee = _employee;
        });

        function formatTime(date) {
            return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        }

        function createWorkTimeEntity() {
            var project;
            if($scope.project) {
                project = $scope.project._links.self.href;
            }
            return {
                employee: employee._links.self.href,
                project: project,
                date: $scope.date,
                start: formatTime($scope.startTime),
                end: formatTime($scope.endTime),
                comment: $scope.comment
            };
        }

        $scope.saveTime = function() {
            var workTimeObject = createWorkTimeEntity();
            Restangular.all('workTimes').post(workTimeObject).then(function() {

            });
        };
    }];
});