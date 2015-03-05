define([], function() {
    'use strict';
    return ['Restangular', '$scope', '$stateParams', 'shared.services.create-or-update-modal', function(Restangular, $scope, $stateParams, createOrUpdateModalService) {

        $scope.showEditForm = function() {
            var $modalInstance= createOrUpdateModalService
                .showModal('trackr.administration.controllers.employees.edit as ctrl',
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

        /*
         Initial load of employee and associated data.
         */
        Restangular.one('employees', $stateParams.id).get()
            .then(function(employee) {
                $scope.employee = employee;
            });

        Restangular.one('federalStates').get().then(function(states) {
            $scope.states = states;
        });
    }];
});