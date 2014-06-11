define([], function() {
    'use strict';
    return ['$stateParams', '$scope', 'Restangular', '$state', '$filter', function($stateParams, $scope, Restangular, $state, $filter) {
        $scope.projectIdChanged = function() {
            $state.go('trackr.administration.projects.edit', {id: $scope.project.identifier});
        };

        /**
         * Called when there was an error changing the identifier of the project.
         * @param response The HTTP response for the failed request.
         * @returns {*} An error array if the response status is 409, undefined otherwise.
         */
        $scope.prjojectIdError = function(response) {
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
        Restangular.allUrl('projects', 'api/projects/search/findByIdentifier').getList({identifier: $stateParams.id}).then(function(projects) {
            //TODO: why does spring return an array? The method signature is a single entity.
            $scope.project = projects[0];
        });
    }];
});