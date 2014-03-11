define(['modules/trackr/supervisor/controllers/timeIntervalSetup'], function(timeIntervalSetup) {
    'use strict';
    return ['$scope', 'Restangular', '$filter', function($scope, Restangular, $filter) {
        $scope.getCompanies = function(searchString) {
            return Restangular.allUrl('companies', '/api/companies/search/findByNameLikeOrderByNameAsc').getList({name: '%' + searchString + '%'});
        };

        $scope.loadProjects = function(company) {
            company.getList('projects').then(function(projects) {
                $scope.projects = projects;
            });
        };

        $scope.loadProjectData = function() {
            if($scope.project) {//only if the user has selected a project
                Restangular.allUrl('billableTimes', '/api/billableTimes/search/findByProjectAndDateBetweenOrderByDateAsc').getList({
                    project: $scope.project.id,
                    start: $filter('date')($scope.start, 'yyyy-MM-dd'),
                    end: $filter('date')($scope.end, 'yyyy-MM-dd')
                }).then(function(result) {
                    console.log(result);
                });
            }
        };

        timeIntervalSetup($scope, $scope.loadProjectData);
    }];
});