define([], function() {
    'use strict';
    return ['Restangular', '$scope', '$stateParams', 'shared.services.create-or-update-modal', function(Restangular, $scope, $stateParams, createOrUpdateModalService) {

        $scope.showEditForm = function() {
            var $modalInstance= createOrUpdateModalService
                .showModal('trackr.administration.employees.editController as ctrl',
                'src/modules/trackr/administration/employees/newOrEdit.tpl.html',
                'ACTIONS.EDIT',
                {
                    employee: $scope.employee,
                    states: $scope.states
                }
            );
            $modalInstance.result.then(function(employee) {
                $scope.employee = employee;
            });
        };

        $scope.showAddressEditForm = function() {
            var $modalInstance = createOrUpdateModalService
                .showModal('trackr.administration.employees.addressEditController as ctrl',
                'src/modules/trackr/administration/employees/addressEdit.tpl.html',
                'ACTIONS.EDIT',
                $scope.employee
            );
            $modalInstance.result.then(function(address) {
                $scope.employee.address = address;
            });
        };

        /*
         Initial load of employee and associated data.
         */
        Restangular.one('employees', $stateParams.id).get({
                projection: 'withAddress'
            })
            .then(function(employee) {
                $scope.employee = employee;
            });

        Restangular.one('federalStates').get().then(function(states) {
            $scope.states = states;
        });
    }];
});