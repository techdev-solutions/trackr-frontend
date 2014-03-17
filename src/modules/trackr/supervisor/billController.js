define(['modules/trackr/supervisor/timeIntervalSetup'], function(timeIntervalSetup) {
    'use strict';
    return ['$scope', 'Restangular', '$filter', '$http', function($scope, Restangular, $filter, $http) {
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

        Restangular.all('projects').getList({sort: 'identifier,asc'}).then(function(projects) {
            $scope.projects = projects;
        });

        timeIntervalSetup($scope, $scope.loadWorktimes);
    }];
});