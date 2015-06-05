define(['modules/shared/PaginationLoader'], function(PaginationLoader) {
    'use strict';
    return ['$scope', 'Restangular', 'shared.services.create-or-update-modal', '$state', function($scope, Restangular, createOrUpdateModalService, $state) {
        var paginationLoader = new PaginationLoader(Restangular.all('projects'), 'projects', 'name,asc', $scope, 10);

        $scope.setPage = function() {
            paginationLoader.loadPage($scope.projects.page.number);
        };

        //initially load all companies
        paginationLoader.loadPage();

        $scope.addNew = function() {
            var $modalInstance = createOrUpdateModalService
                .showModal('trackr.administration.controllers.projects.new',
                'src/modules/trackr/administration/projects/newOrEdit.tpl.html',
                'PROJECT.CREATE_NEW');
            $modalInstance.result.then(function(project) {
                paginationLoader.loadPage();
                $state.go('app.trackr.administration.projects.edit', {id: project.identifier});
            });
        };
    }];
});