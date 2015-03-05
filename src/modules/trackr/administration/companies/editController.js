define(['lodash'], function(_) {
    'use strict';
    return ['createOrUpdateModal.userdata', '$scope', 'Restangular', '$filter', function(company, $scope, Restangular, $filter) {
        var controller = this;

        //Since this is the original object from the display controller and we don't want changes in the edit form to be propagated
        //to the display (e.g. if the user presses cancel) we clone the object.
        $scope.company = _.clone(company, false);
        $scope.address = _.clone(company.address, false);

        controller.saveCompanyError = function(response) {
            if (response.status === 409) {
                $scope.errors = [
                    {
                        entity: 'company',
                        message: $filter('translate')('COMPANY.COMPANY_ID_CONFLICT'),
                        property: 'companyId'
                    }
                ];
            } else {
                $scope.errors = response.data.errors;
            }
            throw new Error('Error saving company.');
        };

        $scope.saveEntity = function() {
            var company = _.pick($scope.company, ['id', 'version', 'companyId', 'name']);
            Restangular.one('companies', company.id).patch(company)
                .then(function() {
                    var address = $scope.address;
                    return Restangular.one('addresses', address.id).patch(address);
                }, controller.saveCompanyError)
                .then(function() {
                    $scope.company.address = $scope.address;
                    $scope.closeModal($scope.company);
                })
                .catch(controller.saveCompanyError);
        };
    }];
});