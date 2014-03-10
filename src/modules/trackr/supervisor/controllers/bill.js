define([], function() {
    'use strict';
    return ['$scope', 'Restangular', '$filter', '$http', function($scope, Restangular, $filter, $http) {
        /**
         * Open a date selector (startDate or endDate)
         * @param $event The button click event
         * @param whichDate either 'start' or 'end'
         */
        $scope.openDate = function($event, whichDate) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope[whichDate] = true;
        };

        $scope.loadWorktimes = function() {
            if($scope.project) {
                //Load this via http as it does not return standard items (custom DTOs without links) and Restangular would not be usefule.
                $http.get('/api/workTimes/findEmployeeMappingByProjectAndDateBetween', {
                    params: {
                        project: $scope.project.id,
                        start: $filter('date')($scope.start, 'yyyy-MM-dd'),
                        end: $filter('date')($scope.end, 'yyyy-MM-dd')
                    }
                }).then(function(response) {
                    $scope.employeeMapping = response.data;
                });
            }
        };

        $scope.getProjectLabel = function(project) {
            if(project) {
                return project.name + ' (' + project.identifier + ')';
            } else {
                return undefined;
            }
        };

        $scope.getProjects = function(searchString) {
            var search = '%' + searchString + '%';
            return Restangular.allUrl('projects', '/api/projects/search/findByNameLikeOrIdentifierLikeOrderByNameAsc').getList({name: search, identifier: search});
        };

        var today = new Date();
        today.setDate(1);
        $scope.start = today;
        $scope.end = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59); //last day of current month

        //TODO: why?
        $scope.$watch('start', $scope.loadWorktimes);
        $scope.$watch('end', $scope.loadWorktimes);

        Restangular.all('projects').getList({sort: 'identifier,asc'}).then(function(projects) {
            $scope.projects = projects;
        });
    }];
});