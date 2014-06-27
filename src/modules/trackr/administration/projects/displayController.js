define(['lodash'], function(_) {
    'use strict';
    return ['$stateParams', '$scope', 'Restangular', '$state', 'shared.services.create-or-update-modal',
        function($stateParams, $scope, Restangular, $state, createOrUpdateModalService) {
            var controller = this;
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

            $scope.showEditForm = function() {
                var $modalInstance = createOrUpdateModalService
                    .showModal('trackr.administration.controllers.projects.edit',
                    'src/modules/trackr/administration/projects/newOrEdit.tpl.html',
                    'ACTIONS.EDIT', $scope.project);
                $modalInstance.result.then(function(project) {
                    var oldProjectId = $scope.project.identifier;
                    $scope.project = project;
                    if (oldProjectId !== project.identifier) {
                        controller.projectIdentifierChanged();
                    }
                });
            };

            controller.projectIdentifierChanged = function() {
                //Change the company id in the list in the parent controller
                var projectInList = _.find($scope.$parent.projects, {id: $scope.project.id});
                projectInList.identifier = $scope.project.identifier;
                //reload so the url is correct
                $state.go('app.trackr.administration.projects.edit', {id: $scope.project.identifier});
            };
        }];
});