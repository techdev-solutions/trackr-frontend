define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.administration.employees.addressEditController', function() {
        var AddressEditController, scope;

        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            scope.closeModal = angular.noop;
            AddressEditController = $controller('trackr.administration.employees.addressEditController', {
                'createOrUpdateModal.userdata': {id: 0},
                '$scope': scope
            });
        }));

        it('create a new address and updates the employee when the address is new.', inject(function($httpBackend) {
            AddressEditController.address = {street: 'foo'};
            scope.saveEntity();
            $httpBackend.expectPOST('api/addresses');
            $httpBackend.expectPUT('api/employees/0/address');
            $httpBackend.flush();
        }));

        it('updates an existing address', inject(function($httpBackend) {
            AddressEditController.address = {id: 0, street: 'foo'};
            scope.saveEntity();
            $httpBackend.expectPUT('api/addresses/0');
            $httpBackend.flush();
        }));
    });
});