define([], function () {
    'use strict';
    return ['$scope', 'Restangular', '$modalInstance', '$log', function($scope, Restangular, $modalInstance, $log) {
        $scope.errors = {};
        $scope.credentialErrors = {};
        $scope.employee = {

        };

        $scope.credential = {

        };

        $scope.saveEmployee = function() {
            function saveCredentials() {
                //set the employee relationship
                $scope.credential.employee = $scope.employee._links.self.href;
                Restangular.all('credentials').post($scope.credential).then(function () {
                    $modalInstance.close($scope.employee);
                }, function (response) {
                    $scope.credentialErrors = response.data;
                });
            }

            /*
                Check if the employee has already been persisted.
                We don't want to persist the employee again in case of validation errors when persisting
                the credentials.
             */
            if(!$scope.employee._persisted) {
                Restangular.all('employees').post($scope.employee).then(function(employee) {
                    $scope.employee = employee;
                    $scope.employee._persisted = true;
                    $scope.errors = {};
                    saveCredentials();
                }, function(response) {
                    $scope.errors = response.data;
                });
            } else {
                /*
                    This branch will be called when there were validation errors when persisting the credentials, the user corrected
                    them and clicked Save again. The employee is already persisted.
                 */
                saveCredentials();
            }
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