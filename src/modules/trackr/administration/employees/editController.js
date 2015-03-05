define(['lodash'], function(_) {
    'use strict';
    return ['createOrUpdateModal.userdata', '$scope', 'Restangular', '$filter', function(userdata, $scope, Restangular, $filter) {
        var controller = this;

        //Mark the isEdit flag so the template displays the role selection and leave date.
        $scope.isEdit = true;

        //Clone the employee so we don't change the reference we got from the display controller if the user cancels.
        $scope.employee = _.clone(userdata.employee, true);

        //The display controller already loaded the states so we don't have to do it again.
        $scope.states = userdata.states;

        controller.employeeError = function(response) {
            if(response.status === 409) {
                $scope.errors = [{
                    entity: 'employee',
                    message: $filter('translate')('CREDENTIAL.EMAIL_CONFLICT'),
                    property: 'employee.email'
                }];
            } else {
                $scope.errors = response.data.errors;
            }
        };

        $scope.saveEntity = function() {
            var employee = _.pick($scope.employee, ['id', 'version', 'firstName', 'lastName', 'title', 'email', 'salary', 'hourlyCostRate', 'vacationEntitlement', 'phoneNumber', 'joinDate', 'leaveDate']);
            //Selects the enum name from the object so it can be converted in the backend.
            employee.federalState = $scope.employee.federalState.name;

            //First, update the employee
            Restangular.one('employees', employee.id).patch(employee)
                .then(function(patchedEmployee) {
                    //Since we only changed the "name" property but not the "state" property of federal state we have to change it here.
                    //The returned patched employee contains the correct federalState object.
                    //If we don't do this, the federal state in the display view will be incorrect.
                    $scope.employee.federalState = patchedEmployee.federalState;
                    $scope.closeModal($scope.employee);
                })
                .catch(controller.employeeError);
        };

        $scope.openDate = function($event, name) {
            $event.stopPropagation();
            $event.preventDefault();
            controller[name] = true;
        };

        $scope.dateOptions = {
            'year-format': '\'yyyy\'',
            'starting-day': 1
        };
    }];
});