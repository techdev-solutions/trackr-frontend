define([], function() {
    'use strict';
    return ['$scope', 'base.services.user', 'Restangular', 'shared.services.create-or-update-modal', function($scope, UserService, Restangular, createOrUpdateModalService) {
        var user = UserService.getUser();
        Restangular.one('employees', user.id).get().then(function(employee) {
            $scope.employee = employee;
        });

        $scope.showEditForm = function() {
            var $modalInstance = createOrUpdateModalService
                .showModal('trackr.employee.controllers.self-edit',
                'src/modules/trackr/employee/self-edit.tpl.html',
                'ACTIONS.EDIT', $scope.employee);
            $modalInstance.result.then(function(result) {
                $scope.employee = result;
            });
        };

        $scope.updateEmployee = function(patch) {
            return Restangular.oneUrl('employees', 'api/employees/' + user.id + '/self').patch(patch);
        };
    }];
});