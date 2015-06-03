define(['lodash'], function(_) {
    'use strict';
    return ['createOrUpdateModal.userdata', '$scope', 'Restangular', function(employee, $scope, Restangular) {
        var controller = this;
        $scope.employee = _.clone(employee, false);

        controller.saveEntity = function(employee) {
            var request = Restangular.oneUrl('employees', 'api/employees/' + employee.id + '/self');
            _.assign(request, _.pick(employee, ['version', 'phoneNumber', 'firstName', 'lastName', 'address']));
            request.put()
                .then(function(updatedEmployee) {
                    $scope.closeModal(updatedEmployee);
                }, function(response) {
                    $scope.errors = response.data.errors;
                });
        };

        $scope.saveEntity = function() {
            controller.saveEntity($scope.employee);
        };
    }];
});