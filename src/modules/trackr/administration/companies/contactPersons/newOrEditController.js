define(['lodash'], function(_) {
    'use strict';
    return ['$scope', 'createOrUpdateModal.userdata', 'Restangular', function($scope, userdata, Restangular) {
        var isNew = true, companyHref, controller = this;

        /**
         * First check if we're editing a contact person or creating a new one. If the userdata contains a contact person we're editing.
         */
        if(userdata.contactPerson) {
            isNew = false;
            $scope.contactPerson = _.clone(userdata.contactPerson, true);
        } else {
            $scope.contactPerson = {};
            companyHref = userdata.companyHref;
        }

        /**
         * Put the errors of a failed HTTP request into the scope.
         * @param response The HTTP response.
         */
        controller.onFail = function(response) {
            $scope.errors = response.data.errors;
        };

        /**
         * Create or update the contact person.
         */
        $scope.saveEntity = function() {
            if(isNew) {
                $scope.contactPerson.company = companyHref;
                Restangular.all('contactPersons').post($scope.contactPerson).then(function(contactPerson) {
                    $scope.closeModal(contactPerson);
                }, controller.onFail);
            } else {
                Restangular.one('contactPersons', $scope.contactPerson.id).patch($scope.contactPerson).then(function() {
                    $scope.closeModal($scope.contactPerson);
                }, controller.onFail);
            }
        };
    }];
});