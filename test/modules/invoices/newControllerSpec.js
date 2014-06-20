define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('invoice new controller', function() {
        var NewController, scope;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            scope.closeModal = angular.noop;
            NewController = $controller('invoices.controllers.new', {
                $scope: scope
            });
        }));

        it('must post to the server when calling addNew', inject(function($httpBackend) {
            scope.saveEntity();
            $httpBackend.expectPOST('api/invoices');
            $httpBackend.flush();
        }));

        it('the error handler for posts must put a special text into the errors array if a conflict is returned', function() {
            var response = { status: 409 };
            NewController.onFail(response);
            expect(scope.errors.length).toBeGreaterThan(0);
            expect(scope.errors[0].property).toBe('identifier');
        });
    });
});