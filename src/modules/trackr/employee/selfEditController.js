define(['lodash'], function(_) {
    'use strict';
    return ['createOrUpdateModal.userdata', '$scope', 'Restangular', function(employee, $scope, Restangular) {
        var controller = this;
        $scope.employee = _.clone(employee, false);

        controller.saveEntity = function(employee) {
            var employeeEntity = _.pick(employee, ['phoneNumber', 'firstName', 'lastName']);
            Restangular.oneUrl('employees', 'api/employees/' + employee.id + '/self').patch(employeeEntity)
                .then(function() {
                    $scope.closeModal(employee);
                }, function(response) {
                    $scope.errors = response.data.errors;
                });
        };

        $scope.saveEntity = function() {
            controller.saveEntity($scope.employee);
        };
    }];
});