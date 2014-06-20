define(['lodash'], function(_) {
    'use strict';
    return ['createOrUpdateModal.userdata', '$scope', 'Restangular', '$filter', function(project, $scope, Restangular, $filter) {
        var controller = this;

        $scope.project = _.clone(project, true);

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

        /**
         * Loads companies by their name
         * @param searchString The name to search for
         * @return {*} A list of companies with a matching name.
         */
        $scope.getCompanies = function(searchString) {
            return Restangular.allUrl('companies', 'api/companies/search/findByNameLikeIgnoreCaseOrderByNameAsc')
                .getList({name: '%' + searchString + '%'});
        };

        controller.saveEntity = function(project) {
            //Create an entity that can be used for Spring-Data-Rest
            var projectEntity = _.pick(project, ['id', 'version', 'name', 'hourlyRate', 'fixedPrice', 'dailyRate', 'identifier', 'volume']);

            //The passed project.company does not have the _links property because of the projection. So if
            //_links is defined the user has selected a new company.
            if(project.company && project.company._links) {
                var companyHref = project.company._links.self.href;
                projectEntity.company = companyHref.substr(0, companyHref.indexOf('{'));
            }

            //See above, same for debitor.
            if(project.debitor && project.debitor._links) {
                var debitorHref = project.debitor._links.self.href;
                projectEntity.debitor = debitorHref.substr(0, debitorHref.indexOf('{'));
            }

            var projectBase = Restangular.one('projects', project.id);
            projectBase.patch(projectEntity)
                .then(function() {
                    if (!project.company) {
                        return projectBase.one('company').remove();
                    }
                })
                .then(function() {
                    if (!project.debitor) {
                        return projectBase.one('debitor').remove();
                    }
                })
                .then(function() {
                    $scope.closeModal(project);
                })
                .catch(controller.onFail);
        };

        /**
         * Delegation to protected method for better testing (project as a parameter).
         */
        $scope.saveEntity = function() {
            controller.saveEntity($scope.project);
        };
    }];
});