define(['baseTestSetup', 'confirmationServiceMock'], function(baseTestSetup, confirmationServiceMock) {
    'use strict';
    describe('trackr.administration.controllers.companies.display', function() {
        var DisplayController, scope;
        baseTestSetup();
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            var stateParams = {
                id: 1000
            };
            DisplayController = $controller('trackr.administration.controllers.companies.display', {
                $scope: scope,
                $stateParams: stateParams,
                'base.services.confirmation-dialog': confirmationServiceMock
            });
        }));

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('must have an empty object for a new contact person', function() {
            expect(scope.newContactPerson).toBeDefined();
        });

        it('must load the company at start', function() {
            expect(scope.company).toBeDefined();
        });

        it('Calling removeContactPerson must delete a contact person', inject(function($httpBackend) {
            var contactPerson = scope.company.contactPersons[0];
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
            var numberOfContactPersons = scope.company.contactPersons.length;
            scope.newContactPerson = scope.company.contactPersons[0];
            scope.saveNewContactPerson();
            $httpBackend.expectPOST('api/contactPersons');
            $httpBackend.flush();
            expect(scope.company.contactPersons.length).toBe(numberOfContactPersons + 1);
        }));
    });
});