define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.administration.controllers.companies.new', function() {
        var NewController, scope;
        baseTestSetup();
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            scope.closeModal = angular.noop;
            NewController = $controller('trackr.administration.controllers.companies.new', {
                $scope: scope
            });
        }));

        it('must have a new company object', function() {
            expect(scope.company).toBeDefined();
        });

        it('must save the company and address', inject(function($httpBackend) {
            scope.saveEntity();
            $httpBackend.expectPOST('api/companies/createWithAddress');
            $httpBackend.flush();
        }));
    });
});