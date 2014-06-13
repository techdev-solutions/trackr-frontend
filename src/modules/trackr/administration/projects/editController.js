define([], function() {
    'use strict';
    return ['$stateParams', '$scope', 'Restangular', '$state', '$filter', function($stateParams, $scope, Restangular, $state, $filter) {
        var controller = this;
        $scope.projectIdChanged = function() {
            $state.go('trackr.administration.projects.edit', {id: $scope.project.identifier});
        };

        /**
         * Called when there was an error changing the identifier of the project.
         * @param response The HTTP response for the failed request.
         * @returns {*} An error array if the response status is 409, undefined otherwise.
         */
        $scope.projectIdError = function(response) {
            if(response.status === 409) {
                return [{
                    entity: 'project',
                    message: $filter('translate')('PROJECT.IDENTIFIER_CONFLICT'),
                    property: 'identifier'
                }];
            }
            return undefined;
        };

        /*
            Initialization of $scope objects
         */
        Restangular.allUrl('projects', 'api/projects/search/findByIdentifier').getList({
            identifier: $stateParams.id,
            projection: 'withCompanyAndDebitor'
        }).then(function(projects) {
            //TODO: why does spring return an array? The method signature is a single entity.
            $scope.project = projects[0];
        });

        $scope.getCompanies = function(searchString) {
            return Restangular.allUrl('companies', 'api/companies/search/findByNameLikeIgnoreCaseOrderByNameAsc').getList({name: '%' + searchString + '%'});
        };

        /**
         * Change the company or debitor on a project.
         *
         * Sets a scope variable $scope.companySaved|$scope.debitorSaved to true after success.
         * @param project The project
         * @param company The company
         * @param field 'company'|'debitor' according to what should be changed.
         */
        controller.changeCompanyOrDebitor = function(project, company, field) {
            var queryParams = {};
            $scope[field + 'Saved'] = false;
            project.customPUT(company._links.self.href, field, queryParams, { 'Content-Type': 'text/uri-list'})
                .then(function() {
                    $scope[field + 'Saved'] = true;
                });
        };

        $scope.changeCompany= function(project, company) {
            controller.changeCompanyOrDebitor(project, company, 'company');
        };

        $scope.changeDebitor = function(project, debitor) {
            controller.changeCompanyOrDebitor(project, debitor, 'debitor');
        };
    }];
});