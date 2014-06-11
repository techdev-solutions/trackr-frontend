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

        it('removeInvoiceFromScope must remove an invoice from', function() {
            var invoice = {id: 3};
            scope.invoices = [invoice];
            IndexController.removeInvoiceFromScope(invoice);
            expect(scope.invoices.length).toBe(0);
        });

        it('must call the restangular remove method on an invoice when deleting it.', function() {
            var invoice = { id: 3, remove: function() {
                return {
                    then: function(cb) { cb(); }
                };
            }};
            spyOn(invoice, 'remove').andCallThrough();
            scope.remove(invoice);
            expect(invoice.remove).toHaveBeenCalled();
        });
    });
});