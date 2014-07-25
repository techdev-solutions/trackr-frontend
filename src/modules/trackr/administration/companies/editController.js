define(['lodash'], function(_) {
    'use strict';
    return ['createOrUpdateModal.userdata', '$scope', 'Restangular', '$filter', function(company, $scope, Restangular, $filter) {
        var controller = this;

        //Since this is the original object from the display controller and we don't want changes in the edit form to be propagated
        //to the display (e.g. if the user presses cancel) we clone the object.
        $scope.company = _.clone(company, true);

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

        /**
         * Put the error messages in the scope if company saving fails.
         *
         * Since the template expects separated company and address errors we have to prepend the field names with 'company.'.
         * @param response The HTTP response from Restangular.
         */
        controller.saveCompanyError = function(response) {
            if (response.status === 409) {
                $scope.errors = [
                    {
                        entity: 'company',
                        message: $filter('translate')('COMPANY.COMPANY_ID_CONFLICT'),
                        property: 'company.companyId'
                    }
                ];
            } else {
                $scope.errors = controller.addPrefixToErrorProperties(response.data.errors, 'company');
            }
            throw new Error('Error saving company.');
        };

        controller.saveAddressError = function(response) {
            $scope.errors = controller.addPrefixToErrorProperties(response.data.errors, 'address');
            throw new Error('Error saving address');
        };

        $scope.saveEntity = function() {
            var company = _.pick($scope.company, ['id', 'version', 'companyId', 'name']);
            Restangular.one('companies', company.id).patch(company)
                .then(function() {
                    var address = $scope.company.address;
                    return Restangular.one('addresses', address.id).patch(address).catch(controller.saveAddressError);
                }, controller.saveCompanyError)
                .then(function() {
                    $scope.closeModal($scope.company);
                });
        };
    }];
});