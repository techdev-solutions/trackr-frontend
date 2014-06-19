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
                'base.services.confirmation-dialog': confirmationServiceMock,
                'shared.services.create-or-update-modal': {
                    showModal: function(ctrl, tpl, head, userdata) {
                        return {
                            result: {
                                then: function(cb) {
                                    cb(userdata);
                                }
                            }
                        };
                    }
                }
            });
        }));

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('must load the company at start', function() {
            expect(scope.company).toBeDefined();
        });

        it('Calling removeContactPerson must delete a contact person', inject(function($httpBackend) {
            var contactPerson = scope.company.contactPersons[0];
            scope.removeContactPerson(contactPerson);
            $httpBackend.expectDELETE('api/contactPersons/' + contactPerson.id);
            $httpBackend.flush();
        }));

        it('Must push the new contact person into the array after createNewContactPerson has succeeded', function() {
            var numberOfContactPersons = scope.company.contactPersons.length;
            scope.createNewContactPerson(scope.company);
            expect(scope.company.contactPersons.length).toBe(numberOfContactPersons + 1);
        });

        it('Must update the contact person in the array after editContactPerson has succeeded', function() {
            var contactPerson = scope.company.contactPersons[0];
            contactPerson.firstName = 'TESTVALUE';
            scope.editContactPerson(contactPerson, scope.company);
            expect(scope.company.contactPersons[0].firstName).toBe('TESTVALUE');
        });
    });
});