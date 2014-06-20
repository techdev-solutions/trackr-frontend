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
                var companyHref = project.company._links.self.href;
                projectEntity.company = companyHref.substr(0, companyHref.indexOf('{'));
            }
            if(project.debitor) {
                var debitorHref = project.debitor._links.self.href;
                projectEntity.debitor = debitorHref.substr(0, debitorHref.indexOf('{'));
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