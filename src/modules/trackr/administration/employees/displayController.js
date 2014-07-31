define([], function() {
    'use strict';
    return ['Restangular', '$scope', '$stateParams', '$controller', 'shared.services.create-or-update-modal', function(Restangular, $scope, $stateParams, $controller, createOrUpdateModalService) {
        $controller('trackr.administration.controllers.employees.roles-base', {$scope: $scope});

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
        Restangular.one('employees', $stateParams.id).get({
            projection: 'withCredential'
        }).then(function(employee) {
            $scope.employee = employee;
        }).then(function() {
            Restangular.one('credentials', $stateParams.id).all('authorities').getList().then(function(authorities) {
                $scope.employee.credential.authorities = authorities;
            });
        });

        Restangular.one('federalStates').get().then(function(states) {
            $scope.states = states;
        });
    }];
});