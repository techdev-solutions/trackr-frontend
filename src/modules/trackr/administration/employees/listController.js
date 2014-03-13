define([], function () {
    'use strict';
    return ['$scope', 'Restangular', '$modal', '$state', function($scope, Restangular, $modal, $state) {
        var allUsers = Restangular.all('employees');

        function loadEmployees(page) {
            page = page || 1;
            allUsers.getList({sort: 'lastName', page: page - 1, size: 5}).then(function (employees) {
                $scope.employees = employees;
            });
        }

        $scope.setPage = function(page) {
            loadEmployees(page);
        };

        //initially load all employees
        loadEmployees();

        $scope.addNew = function() {
            var modalInstance = $modal.open({
                templateUrl: '/src/modules/trackr/administration/partials/employees/new.tpl.html',
                controller: 'trackr.administration.controllers.employees.new'
            });
            modalInstance.result.then(function(employee) {
                loadEmployees();
                $state.go('trackr.administration.employees.edit', {id: employee.id});
            });
        };
    }];
});