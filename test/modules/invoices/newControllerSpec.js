define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('invoice new controller', function() {
        var NewController, scope;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            var modalInstance = {
                close: angular.noop
            };
            NewController = $controller('invoices.controllers.new', {
                $scope: scope,
                $modalInstance: modalInstance
            });
        }));

        it('must post to the server when calling addNew', inject(function($httpBackend) {
            var invoice = {};
            var debitor = { _links: { self: { href: '' }}};
            scope.saveInvoice(invoice, debitor);
            $httpBackend.expectPOST('api/invoices');
            $httpBackend.flush();
        }));

        it('the error handler for posts must put a special text into the errors array if a conflict is returned', function() {
            var response = { status: 409 };
            NewController.postErrorHandler(response);
            expect(scope.errors.length).toBeGreaterThan(0);
            expect(scope.errors[0].property).toBe('identifier');
        });
    });
});