define(['modules/shared/addErrorHandlers'], function(addErrorHandlers) {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.employee', function($scope, Restangular, EmployeeService) {
        var controller = this;
        addErrorHandlers($scope);
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

        $scope.errors = [];

        $scope.getProjects = function(searchString) {
            var search = '%' + searchString + '%';
            return Restangular.allUrl('projects', 'api/projects/search/findByNameLikeOrIdentifierLikeOrderByNameAsc').getList({name: search, identifier: search});
        };

        controller.formatTime = function(date) {
            return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        };

        controller.createWorkTimeEntity = function() {
            var project;
            if($scope.project) {
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
            }, function(response) {
                $scope.errors = response.data.errors;
            });
        };
    }];
});