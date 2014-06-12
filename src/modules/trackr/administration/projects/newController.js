define([], function () {
    'use strict';
    return ['$scope', 'Restangular', '$modalInstance', function($scope, Restangular, $modalInstance) {
        $scope.errors = [];
        $scope.project = {};

        //TODO: why do we need to pass the company?
        $scope.saveProject = function(projectCompany, debitorCompany) {
            if(projectCompany) {
                $scope.project.company = projectCompany._links.self.href;
            }
            if(debitorCompany) {
                $scope.project.debitor = debitorCompany._links.self.href;
            }
            Restangular.all('projects').post($scope.project).then(function(project) {
                $modalInstance.close(project);
            }, function(response) {
                $scope.errors = response.data.errors;
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss();
        };

        $scope.getCompanies = function(searchString) {
            return Restangular.allUrl('companies', 'api/companies/search/findByNameLikeIgnoreCaseOrderByNameAsc').getList({name: '%' + searchString + '%'});
        };
    }];
});