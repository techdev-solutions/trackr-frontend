define([], function () {
    'use strict';
    return ['$scope', 'Restangular', '$modalInstance', function($scope, Restangular, $modalInstance) {
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
            $modalInstance.dismiss();
        };
    }];
});