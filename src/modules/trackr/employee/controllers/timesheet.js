define([], function() {
    'use strict';
    return ['$scope', 'Restangular', 'base.services.user', function($scope, Restangular, UserService) {
        var today = new Date();
        $scope.date = today;
        $scope.startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0, 0);
        $scope.endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 30, 0);

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

        $scope.getProjects = function(searchString) {
            var search = '%' + searchString + '%';
            return Restangular.allUrl('projects', '/api/projects/search/findByNameLikeOrIdentifierLikeOrderByNameAsc').getList({name: search, identifier: search});
        };

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
                startTime: formatTime($scope.startTime),
                endTime: formatTime($scope.endTime),
                comment: $scope.comment
            };
        }

        $scope.saveTime = function() {
            var workTimeObject = createWorkTimeEntity();
            Restangular.all('workTimes').post(workTimeObject).then(function() {}, function(response) {
                $scope.errors = response.data;
            });
        };
    }];
});