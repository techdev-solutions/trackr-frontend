define([], function () {
    'use strict';
    return ['$scope', 'Restangular', '$modal', '$state', function($scope, Restangular, $modal, $state) {
        var allProjects = Restangular.all('projects');

        function loadProjects(page) {
            page = page || 1;
            allProjects.getList({sort: 'name,asc', page: page - 1, size: 5}).then(function (projects) {
                $scope.projects = projects;
            });
        }

        $scope.setPage = function(page) {
            loadProjects(page);
        };

        //initially load all companies
        loadProjects();

        $scope.addNew = function() {
            var modalInstance = $modal.open({
                backdrop: 'static',
                templateUrl: '/src/modules/trackr/administration/partials/projects/new.tpl.html',
                controller: 'trackr.administration.controllers.projects.new'
            });
            modalInstance.result.then(function(project) {
                loadProjects();
                $state.go('trackr.administration.projects.edit', {id: project.identifier});
            });
            return modalInstance;
        };
    }];
});