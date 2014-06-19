define(['angular', 'baseTestSetup', 'fixtures'], function(angular, baseTestSetup, fixtures) {
    'use strict';
    describe('trackr.administration.controllers.companies.edit', function() {
        var EditController, scope;
        baseTestSetup();
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            scope.closeModal = angular.noop;

            var company = fixtures['api/companies']._embedded.companies[0];
            company.address = fixtures['api/addresses']._embedded.addresses[0];
            company.contactPersons = fixtures['api/contactPersons']._embedded.contactPersons;

            EditController = $controller('trackr.administration.controllers.companies.edit', {
                $scope: scope,
                'createOrUpdateModal.userdata': company
            });
        }));

        it('addPrefixToErrorProperties must add a prefix to all properties in an errors array', function() {
            var errors = [
                {property: 'test'},
                {property: 'test2'}
            ];
            var errorsResult = EditController.addPrefixToErrorProperties(errors, 'prefix');
            expect(errorsResult[0].property).toBe('prefix.test');
            expect(errorsResult[1].property).toBe('prefix.test2');
        });

        it('saveEntity must first save the company and then the address', inject(function($httpBackend) {
            scope.saveEntity();
            $httpBackend.expectPATCH('api/companies/' + scope.company.id);
            $httpBackend.expectPATCH('api/addresses/' + scope.company.address.id);
            $httpBackend.flush();
        }));
    });
});