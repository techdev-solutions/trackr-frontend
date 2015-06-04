define(['lodash'], function(_) {
    'use strict';
    function addressEditController(employee, $scope, Restangular) {
        /*jshint validthis:true */
        var controller = this;
        controller.address = _.clone(employee.address);

        $scope.saveEntity = function() {
            var address = _.pick(controller.address, ['id', 'version', 'street', 'houseNumber', 'zipCode', 'city', 'country']);
            if(address.id === undefined) {
                createNewAddress(address);
            } else {
                updateAddress(address);
            }
        };

        function createNewAddress(address) {
            Restangular.all('addresses').post(address)
                .then(function(savedAddress) {
                    setAddressOnEmployee(savedAddress)
                        .then(function() {
                            $scope.closeModal(savedAddress);
                        });
                }, onFailedRequest);
        }

        function setAddressOnEmployee(address) {
            return Restangular.one('employees', employee.id)
                .customOperation('put', 'address', {}, {'Content-Type': 'text/uri-list'}, address._links.self.href);
        }

        function updateAddress(address) {
            var request = Restangular.one('addresses', address.id);
            _.assign(request, address);
            request.put().then(function(updatedAddress) {
                $scope.closeModal(updatedAddress);
            }, onFailedRequest);
        }

         function onFailedRequest(response) {
            $scope.errors = response.data.errors;
        }
    }

    addressEditController.$inject = ['createOrUpdateModal.userdata', '$scope', 'Restangular'];
    return addressEditController;
});