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

        function watchDateOnEmployeeAndPatchOnChange(name) {
            $scope.$watch('employee.' + name, function(newDate, oldDate) {
                /*
                When the employee is loaded this will be triggered, with oldDate = undefined and newDate = null/actual date.
                We only want to patch if the date has actually changed, so the oldDate came from the request and is not initial (i.e. undefined).
                 */
                if(oldDate !== undefined) {
                    var patch = {};
                    patch[name] = newDate;
                    employeeBase.patch(patch).then(function() {
                        //If the leaveDate has changed the employee may have been deactivated.
                        var authorities = $scope.credential.authorities;
                        if(name === 'leaveDate') {
                            credentialBase.get().then(function(credential) {
                                $scope.credential = credential;
                                $scope.credential.authorities = authorities;
                            });
                        }
                    });
                }
            });
        }

        watchDateOnEmployeeAndPatchOnChange('joinDate');
        watchDateOnEmployeeAndPatchOnChange('leaveDate');

        $scope.$watch('employee.federalState.name', function(newValue, oldValue) {
            if(oldValue !== undefined) {
                var patch = {
                    federalState: newValue
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

        Restangular.one('federalStates').get().then(function(states) {
            $scope.states = states;
        });
    }];
});