define([], function () {
    'use strict';
    return ['$scope', 'Restangular', '$modalInstance', '$log', function($scope, Restangular, $modalInstance, $log) {
        $scope.errors = {};
        $scope.employee = {};
        $scope.credential = {};

        $scope.saveEmployee = function() {
            Restangular.allUrl('employees', '/api/employees/createWithCredential').post({
                employee: $scope.employee,
                credential: $scope.credential
            }).then(function(employee) {
                $modalInstance.close(employee);
            }, function(response) {
                $scope.errors = response.data;
            });
        };

        $scope.cancel = function() {
            if($scope.employee._persisted) {
                $log.debug('Address was saved but company creation cancelled, deleting address');
                $scope.employee.remove();
            }
            $modalInstance.dismiss();
        };
    }];
});