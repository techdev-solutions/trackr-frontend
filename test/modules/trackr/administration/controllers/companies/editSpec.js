define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.administration.controllers.companies.edit', function() {
        var EditController, scope;
        baseTestSetup();
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            var stateParams = {
                id: 1000
            };
            EditController = $controller('trackr.administration.controllers.companies.edit', {
                $scope: scope,
                $stateParams: stateParams
            });
        }));

        it('must load the company at start', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.company).toBeDefined();
            expect(scope.company.id).toBeDefined();
            expect(scope.address).toBeDefined();
            expect(scope.address.id).toBeDefined();
            expect(scope.contactPersons).toBeDefined();
            expect(scope.contactPersons.length).toBeGreaterThan(0);
        }));

        it('Calling removeContactPerson must delete a contact person', inject(function($httpBackend) {
            $httpBackend.flush();
            var contactPerson = scope.contactPersons[0];
            scope.removeContactPerson(contactPerson);
            $httpBackend.expectDELETE('/api/contactPersons/' + contactPerson.id);
            $httpBackend.flush();
        }));
    });
});