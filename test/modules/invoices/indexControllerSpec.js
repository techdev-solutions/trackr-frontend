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

        it('must send an HTTP request to the backend when marking an invoice as paid', inject(function($httpBackend) {
            var invoice = {id: 3, invoiceState: 'OVERDUE'};
            scope.markPaid(invoice);
            $httpBackend.expectPOST(/^api\/invoices\/3\/markPaid$/);
            $httpBackend.flush();
        }));

        it('must call the restangular remove method on an invoice when deleting it and refresh the page', inject(function($httpBackend) {
            $httpBackend.flush();
            spyOn(IndexController, 'refreshPage');
            var invoice = { id: 3, invoiceState: 'OVERDUE', remove: function() {
                return {
                    then: function(cb) { cb(); }
                };
            }};
            spyOn(invoice, 'remove').andCallThrough();
            scope.remove(invoice);
            expect(invoice.remove).toHaveBeenCalled();
            expect(IndexController.refreshPage).toHaveBeenCalled();
        }));

        it('executeSearch loads the invoices', inject(function($httpBackend) {
            $httpBackend.flush();
            spyOn(IndexController, 'loadInvoices');
            scope.executeSearch();
            expect(IndexController.loadInvoices).toHaveBeenCalled();
        }));

        it('setPAge loads the invoices', inject(function($httpBackend) {
            $httpBackend.flush();
            spyOn(IndexController, 'loadInvoices');
            scope.setPage('OUTSTANDING');
            expect(IndexController.loadInvoices).toHaveBeenCalled();
        }));

        it('loadInvoices uses the search loader if searchQuery is set', inject(function($httpBackend) {
            $httpBackend.flush();
            scope.searchQuery = 'test';
            IndexController.loadInvoices(1);
            $httpBackend.expectGET(/^api\/invoices\/search\/findByIdentifierLikeAndInvoiceState\?identifier=%25test%25&page=\d+&size=\d+&sort=creationDate&state=OVERDUE/);
            $httpBackend.expectGET(/^api\/invoices\/search\/findByIdentifierLikeAndInvoiceState\?identifier=%25test%25&page=\d+&size=\d+&sort=creationDate&state=OUTSTANDING/);
            $httpBackend.expectGET(/^api\/invoices\/search\/findByIdentifierLikeAndInvoiceState\?identifier=%25test%25&page=\d+&size=\d+&sort=creationDate&state=PAID/);
            $httpBackend.flush()
        }));

        it('loadInvoices only loads one state if state is set', inject(function($httpBackend) {
            $httpBackend.flush();
            scope.searchQuery = 'test';
            IndexController.loadInvoices(1, 'OVERDUE');
            $httpBackend.expectGET(/^api\/invoices\/search\/findByIdentifierLikeAndInvoiceState\?identifier=%25test%25&page=\d+&size=\d+&sort=creationDate&state=OVERDUE/);
            $httpBackend.flush()
        }));
    });
});