define([], function() {
    'use strict';
    return ['$scope', 'Restangular', '$filter', function($scope, Restangular, $filter) {
        var controller = this;

        $scope.employee = {
            credential: {
                locale: 'en'
            }
        };

        controller.onFail = function(response) {
            if (response.status === 409) {
                $scope.errors = [{
                    entity: 'credential',
                    message: $filter('translate')('CREDENTIAL.EMAIL_CONFLICT'),
                    property: 'credential.email'
                }];
            } else {
                $scope.errors = response.data.errors;
            }
        };

        $scope.saveEntity = function() {
            //In case of an error we remember the federal state so we can set it back.
            var federalState = $scope.employee.federalState;
            if($scope.employee.federalState) {
                $scope.employee.federalState = $scope.employee.federalState.name;
            }
            Restangular.allUrl('employees', 'api/employees/createWithCredential').post({
                employee: $scope.employee,
                credential: $scope.employee.credential
            }).then(function(employee) {
                $scope.closeModal(employee);
            }, function(response) {
                controller.onFail(response);
                $scope.employee.federalState = federalState;
            });
        };

        Restangular.one('federalStates').get().then(function(states) {
            $scope.states = states;
        });

        $scope.openDate = function($event, name) {
            $event.stopPropagation();
            $event.preventDefault();
            controller[name] = true;
        };
    }];
});