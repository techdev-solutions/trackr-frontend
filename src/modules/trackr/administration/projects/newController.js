define(['lodash'], function (_) {
    'use strict';
    return ['$scope', 'Restangular', '$filter', function($scope, Restangular, $filter) {
        var controller = this;
        $scope.project = {};

        controller.onFail = function(response) {
            if(response.status === 409) {
                $scope.errors = [{
                    entity: 'project',
                    message: $filter('translate')('PROJECT.IDENTIFIER_CONFLICT'),
                    property: 'identifier'
                }];
            } else {
                $scope.errors = response.data.errors;
            }
        };

        controller.saveEntity = function(project) {
            var projectEntity = _.clone(project, false);

            if(project.company) {
                projectEntity.company = project.company._links.self.href;
            }
            if(project.debitor) {
                projectEntity.debitor = project.debitor._links.self.href;
            }

            Restangular.all('projects').post(projectEntity).then(function(response) {
                $scope.closeModal(response);
            }, controller.onFail);
        };

        $scope.saveEntity = function() {
            controller.saveEntity($scope.project);
        };

        $scope.getCompanies = function(searchString) {
            return Restangular.allUrl('companies', 'api/companies/search/findByNameLikeIgnoreCaseOrderByNameAsc')
                .getList({name: '%' + searchString + '%'});
        };
    }];
});