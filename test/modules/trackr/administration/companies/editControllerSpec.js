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

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('must have an object for contact person errors', function() {
            expect(scope.contactPersonErrors).toBeDefined();
        });

        it('must have an empty object for a new contact person', function() {
            expect(scope.newContactPerson).toBeDefined();
        });

        it('must load the company at start', function() {
            expect(scope.company).toBeDefined();
            expect(scope.company.id).toBeDefined();
            expect(scope.address).toBeDefined();
            expect(scope.address.id).toBeDefined();
            expect(scope.contactPersons).toBeDefined();
            expect(scope.contactPersons.length).toBeGreaterThan(0);
        });

        it('Calling removeContactPerson must delete a contact person', inject(function($httpBackend) {
            var contactPerson = scope.contactPersons[0];
            scope.removeContactPerson(contactPerson);
            $httpBackend.expectDELETE('api/contactPersons/' + contactPerson.id);
            $httpBackend.flush();
        }));

        it('must switch the showContactPerson form', inject(function() {
            scope.doShowContactPersonForm(false);
            expect(scope.showContactPersonForm).toBe(false);
            scope.doShowContactPersonForm(true);
            expect(scope.showContactPersonForm).toBe(true);
        }));

        it('Must add a new contact person on saveNewContactPerson', inject(function($httpBackend) {
            var numberOfContactPersons = scope.contactPersons.length;
            scope.newContactPerson = scope.contactPersons[0];
            scope.saveNewContactPerson();
            $httpBackend.expectPOST('api/contactPersons');
            $httpBackend.flush();
            expect(scope.contactPersons.length).toBe(numberOfContactPersons + 1);
        }));
    });
});