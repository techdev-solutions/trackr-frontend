define([], function() {
    'use strict';
    return ['Restangular', '$scope', '$stateParams', '$controller', function(Restangular, $scope, $stateParams, $controller) {
        $controller('trackr.administration.controllers.employees.roles-base', {$scope: $scope});

        //Contains the restangularified credential base object (i.e. URL = /api/credentials/xy not /api/employees/x/credential)
        var credentialBase;
        var employeeBase = Restangular.one('employees', $stateParams.id);

        /**
         * Switch the enabled flag in the credentials via a PATCH call to the API.
         */
        $scope.changeEnabled = function() {
            var patch = {
                enabled: !$scope.credential.enabled
            };
            credentialBase.patch(patch).then(function(credential) {
                $scope.credential = credential;
            });
        };

        $scope.$watch('employee.joinDate', function(newDate, oldDate) {
            if(oldDate) {
                var patch = {
                    joinDate: newDate
                };
                employeeBase.patch(patch);
            }
        });

        /*
         Initial load of employee and associated data.
         */
        employeeBase.get().then(function(employee) {
            $scope.employee = employee;
            employee.one('credential').get().then(function(credential) {
                $scope.credential = credential;
                credentialBase = Restangular.one('credentials', credential.id);
                credentialBase.all('authorities').getList().then(function(authorities) {
                    $scope.credential.authorities = authorities;
                });
            });
        });
    }];
});