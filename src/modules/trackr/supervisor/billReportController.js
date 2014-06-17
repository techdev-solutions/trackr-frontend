define(['modules/trackr/supervisor/timeIntervalSetup'], function(timeIntervalSetup) {
    'use strict';
    return ['$scope', 'Restangular', '$filter', '$http', function($scope, Restangular, $filter, $http) {
        $scope.getCompanies = function(searchString) {
            return Restangular.allUrl('companies', 'api/companies/search/findByNameLikeIgnoreCaseOrderByNameAsc')
                .getList({name: '%' + searchString + '%'});
        };

        $scope.loadProjects = function(company) {
            company.all('projects').getList({projection: 'withCompanyAndDebitor'}).then(function(projects) {
                $scope.projects = projects;
            });
        };

        $scope.loadProjectData = function() {
            $scope.loadBillData();
        };

        $scope.loadBillData = function() {
            //only if the user has selected a project
            if($scope.project) {
                $http.get('api/billableTimes/findEmployeeMappingByProjectAndDateBetween', {
                    params: {
                        project: $scope.project.id,
                        start: $filter('date')($scope.start, 'yyyy-MM-dd'),
                        end: $filter('date')($scope.end, 'yyyy-MM-dd')
                    }
                }).then(function(result) {
                    $scope.employeeMapping = result.data;
                });
            }
        };

        timeIntervalSetup($scope, $scope.loadBillData);
    }];
});