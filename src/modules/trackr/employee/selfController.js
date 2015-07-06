define([], function() {
    'use strict';
    function selfController($scope, UserService, Restangular, createOrUpdateModalService) {
        var user = UserService.getUser();
        Restangular.one('employees', user.id).one('self').get()
            .then(function(employee) {
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

    }
    selfController.$inject = ['$scope', 'base.services.user', 'Restangular', 'shared.services.create-or-update-modal'];
    return selfController;
});