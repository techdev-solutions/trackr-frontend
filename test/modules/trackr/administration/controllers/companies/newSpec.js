define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.administration.controllers.companies.new', function() {
        var NewController, scope;
        baseTestSetup();
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            NewController = $controller('trackr.administration.controllers.companies.new', {
                $scope: scope,
                $modalInstance: {
                    //for now mocked here
                    //TODO: find out why the provider is not available
                    dismiss: function() {

                    },

                    close: function () {

                    }
                }
            });
        }));

        it('must have an errors object', function() {
            expect(scope.errors).toBeDefined();
        });

        it('must have a new company object', function() {
            expect(scope.company).toBeDefined();
        });

        it('must have a new address object', function() {
            expect(scope.address).toBeDefined();
        });

        it('must save the company and address', inject(function($httpBackend) {
            scope.saveCompany();
            $httpBackend.expectPOST('/api/companies/createWithAddress');
            $httpBackend.flush();
        }));
    });
});