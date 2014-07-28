define(['modules/shared/PaginationLoader'], function (PaginationLoader) {
    'use strict';
    return ['$scope', 'Restangular', '$state', 'shared.services.create-or-update-modal', function($scope, Restangular, $state, createOrUpdateModalService) {
        var paginationLoader = new PaginationLoader(Restangular.all('employees'), 'employees', 'lastName', $scope, 10);

        $scope.setPage = function() {
            paginationLoader.loadPage($scope.employees.page.number);
        };

        //initially load all employees
        paginationLoader.loadPage();

        $scope.addNew = function() {
            var $modalInstance = createOrUpdateModalService
                .showModal('trackr.administration.controllers.employees.new as ctrl',
                'src/modules/trackr/administration/employees/newOrEdit.tpl.html',
                'EMPLOYEE.CREATE_NEW'
            );

            $modalInstance.result.then(function(employee) {
                paginationLoader.loadPage();
                $state.go('app.trackr.administration.employees.edit', {id: employee.id});
            });
        };
    }];
});