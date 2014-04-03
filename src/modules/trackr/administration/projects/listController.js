define(['modules/shared/PaginationLoader'], function(PaginationLoader) {
    'use strict';
    return ['$scope', 'Restangular', '$modal', '$state', function($scope, Restangular, $modal, $state) {
        var paginationLoader = new PaginationLoader(Restangular.all('projects'), 'projects', 'name,asc', $scope);

        $scope.setPage = function(page) {
            paginationLoader.loadPage(page);
        };

        //initially load all companies
        paginationLoader.loadPage();

        $scope.addNew = function() {
            var modalInstance = $modal.open({
                backdrop: 'static',
                templateUrl: 'src/modules/trackr/administration/projects/new.tpl.html',
                controller: 'trackr.administration.controllers.projects.new'
            });
            modalInstance.result.then(function(project) {
                paginationLoader.loadPage();
                $state.go('trackr.administration.projects.edit', {id: project.identifier});
            });
            return modalInstance;
        };
    }];
});