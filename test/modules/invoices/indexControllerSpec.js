define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('invoice index controller', function() {
        var IndexController, scope;
        baseTestSetup();

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();

            IndexController = $controller('invoices.controllers.index', {
                $scope: scope
            });
        }));

        it('should load invoices when switching the tab', inject(function($httpBackend) {
            scope.switchTab('OUTSTANDING');
            $httpBackend.expectGET(/^api\/invoices\/search\/findByInvoiceState\?page=\d+&size=\d+&sort=creationDate&state=\w+/);
            $httpBackend.flush();
            expect(scope.invoices).toBeDefined();
            expect(scope.invoices.length).toBeGreaterThan(0);
        }));

        it('must send an HTTP request to the backend when marking an invoice as paid', inject(function($httpBackend) {
            var invoice = {id: 3};
            scope.markPaid(invoice);
            $httpBackend.expectPOST(/^api\/invoices\/3\/markPaid$/);
            $httpBackend.flush();
        }));

        it('must remove an invoice from the invoices array if it is marked as paid', inject(function($httpBackend) {
            var invoice = {id: 3};
            scope.invoices = [invoice];
            scope.markPaid(invoice);
            $httpBackend.flush();
            expect(scope.invoices.length).toBe(0);
        }));
    });
});