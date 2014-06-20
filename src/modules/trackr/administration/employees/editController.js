define(['lodash', 'moment'], function(_, moment) {
    'use strict';
    return ['createOrUpdateModal.userdata', '$scope', 'Restangular', '$filter', '$controller', function(userdata, $scope, Restangular, $filter, $controller) {
        var controller = this;
        $controller('trackr.administration.controllers.employees.roles-base', {$scope: $scope});

        //Mark the isEdit flag so the template displays the role selection and leave date.
        $scope.isEdit = true;

        //Clone the employee so we don't change the reference we got from the display controller if the user cancels.
        $scope.employee = _.clone(userdata.employee, true);

        //The display controller already loaded the states so we don't have to do it again.
        $scope.states = userdata.states;

        $scope.selectedAuthorities = {};
        //Add the authorities that the employee has to the map
        $scope.employee.credential.authorities.forEach(function(authority) {
            $scope.selectedAuthorities[authority._links.self.href] = true;
        });

        /**
         * Add a prefix to every error.property in the array errors.
         * @param errors An array of errors
         * @param prefix A string, the prefix to add.
         * @return The modified array.
         */
        controller.addPrefixToErrorProperties = function(errors, prefix) {
            return _.map(errors, function(error) {
                error.property = prefix + '.' + error.property;
                return error;
            });
        };

        controller.credentialError = function(response) {
            if(response.status === 409) {
                $scope.errors = [{
                    entity: 'credential',
                    message: $filter('translate')('CREDENTIAL.EMAIL_CONFLICT'),
                    property: 'credential.email'
                }];
            } else {
                $scope.errors = controller.addPrefixToErrorProperties(response.data.errors, 'credential');
            }
        };

        controller.employeeError = function(response) {
            $scope.errors = controller.addPrefixToErrorProperties(response.data.errors, 'employee');
        };

        /**
         * Turns a map of authority hrefs to boolean into an array of all authority hrefs that had the boolean set to true.
         * @param authorityMap A map a of authority hrefs to boolean.
         * @return {Array} All hrefs with the boolean true.
         */
        controller.getSelectedAuthoritiesArray = function(authorityMap) {
            return _.keys(_.pick(authorityMap, function(active) {
                return active;
            }));
        };

        /**
         * Triggered when the leaving date is changed to potentially deactive the credential.enabled flag
         */
        $scope.leaveDateChange = function(leaveDate) {
            if(moment().isAfter(leaveDate)) {
                $scope.employee.credential.enabled = false;
            }
        };

        $scope.saveEntity = function() {
            var employee = _.pick($scope.employee, ['id', 'version', 'firstName', 'lastName', 'title', 'salary', 'hourlyCostRate', 'vacationEntitlement', 'phoneNumber', 'joinDate', 'leaveDate']);
            //Selects the enum name from the object so it can be converted in the backend.
            employee.federalState = $scope.employee.federalState.name;

            //First, update the employee
            Restangular.one('employees', employee.id).patch(employee).then(function(patchedEmployee) {
                //Since we only changed the "name" property but not the "state" property of federal state we have to change it here.
                //The returned patched employee contains the correct federalState object.
                //If we don't do this, the federal state in the display view will be incorrect.
                $scope.employee.federalState = patchedEmployee.federalState;

                //Next, update the credential
                var credential = _.pick($scope.employee.credential, ['id', 'version', 'email', 'enabled']);
                Restangular.one('credentials', credential.id).patch(credential).then(function() {

                    //Now update the authorities for the credential.
                    var selectedAuthorities = controller.getSelectedAuthoritiesArray($scope.selectedAuthorities);
                    var selectedAuthoritiesAsString = selectedAuthorities.reduce(function(val, href) {
                        return val + href + '\n';
                    }, '');
                    Restangular.one('credentials', userdata.employee.id)
                        .customOperation('put', 'authorities', {}, {'Content-Type': 'text/uri-list'}, selectedAuthoritiesAsString)
                        .then(function() {
                            //Lastly, since we pass the employee back to the display controller we have to update the authorities in
                            //the credential object itself to the selected authorities that were saved.
                            $scope.employee.credential.authorities = $scope.authorities.filter(function(authority) {
                                return selectedAuthorities.indexOf(authority._links.self.href) > -1;
                            });
                            $scope.closeModal($scope.employee);
                        });
                }, controller.credentialError);
            }, controller.employeeError);

        };
    }];
});