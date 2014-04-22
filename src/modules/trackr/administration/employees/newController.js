define([], function() {
    'use strict';
    return ['$scope', 'Restangular', '$modalInstance', '$filter', function($scope, Restangular, $modalInstance, $filter) {
        $scope.errors = [];
        $scope.employee = {};
        $scope.credential = {};

        $scope.saveEmployee = function() {
            $scope.credential.locale = 'en';
            Restangular.allUrl('employees', 'api/employees/createWithCredential').post({
                employee: $scope.employee,
                credential: $scope.credential
            }).then(function(employee) {
                $modalInstance.close(employee);
            }, function(response) {
                if(response.status === 409) {
                    $scope.errors = {
                        'credential.email': {
                            defaultMessage: $filter('translate')('CREDENTIAL.EMAIL_CONFLICT')
                        }
                    };
                } else {
                    $scope.errors = response.data.errors;
                }
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss();
        };

        Restangular.one('federalStates').get().then(function(states) {
            $scope.states = states;
        });
    }];
});