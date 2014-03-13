define([], function() {
    'use strict';
    return ['$stateParams', '$scope', 'Restangular', '$state', function($stateParams, $scope, Restangular, $state) {
        $scope.projectIdChanged = function() {
            $state.go('trackr.administration.companies.edit', {id: $scope.project.companyId});
        };

        /*
            Initialization of $scope objects
         */
        Restangular.allUrl('projects', '/api/projects/search/findByIdentifier').getList({identifier: $stateParams.id}).then(function(projects) {
            //TODO: why does spring return an array? The method signature is a single entity.
            $scope.project = projects[0];
        });
    }];
});