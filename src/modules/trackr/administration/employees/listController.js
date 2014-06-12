define(['modules/shared/PaginationLoader'], function (PaginationLoader) {
    'use strict';
    return ['$scope', 'Restangular', '$modal', '$state', function($scope, Restangular, $modal, $state) {
        var paginationLoader = new PaginationLoader(Restangular.all('employees'), 'employees', 'lastName', $scope, 10);

        $scope.setPage = function() {
            paginationLoader.loadPage($scope.employees.page.number);
        };

        //initially load all employees
        paginationLoader.loadPage();

        $scope.addNew = function() {
            var modalInstance = $modal.open({
                templateUrl: 'src/modules/trackr/administration/employees/new.tpl.html',
                controller: 'trackr.administration.controllers.employees.new'
            });
            modalInstance.result.then(function(employee) {
                paginationLoader.loadPage();
                $state.go('trackr.administration.employees.edit', {id: employee.id});
            });
            return modalInstance;
        };
    }];
});