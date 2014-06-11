define(['modules/shared/PaginationLoader', 'lodash'], function (PaginationLoader, _) {
    'use strict';
    return ['$scope', '$modal', 'Restangular', '$http', function($scope, $modal, Restangular, $http) {
        var controller = this;
        var paginationLoader = new PaginationLoader(Restangular.allUrl('invoices', 'api/invoices/search/findByInvoiceState'),
            'invoices', 'creationDate', $scope, 20);
        /**
         * On a tab switch load the corresponding invoices.
         * @param invoiceState OUTSTANDING, PAID, OVERDUE
         */
        $scope.switchTab = function(invoiceState) {
            //Avoid displaying invoices in the wrong tab
            $scope.invoices = [];

            paginationLoader.loadPage(1, {state: invoiceState});
        };

        $scope.setPage = function(page, invoiceState) {
            paginationLoader.loadPage(page, {state: invoiceState});
        };

        /**
         * Display the modal for adding a new invoice.
         * @returns {*} The modal instance.
         */
        $scope.addNew = function() {
            var modalInstance = $modal.open({
                backdrop: 'static',
                templateUrl: 'src/modules/invoices/new.tpl.html',
                controller: 'invoices.controllers.new'
            });
            modalInstance.result.then(function() {
                console.log('Invoice created');
            });
            return modalInstance;
        };

        controller.removeInvoiceFromScope = function(invoice) {
            _.remove($scope.invoices, function(inv) {
                return inv.id === invoice.id;
            });
        };

        /**
         * Delete an invoice.
         * @param invoice The invoice to delete.
         */
        $scope.remove = function(invoice) {
            invoice.remove().then(function() {
                controller.removeInvoiceFromScope(invoice);
            });
        };

        /**
         * Mark the invoice as paid.
         * @param invoice Invoice to mark.
         */
        $scope.markPaid = function(invoice) {
            $http.post('api/invoices/' + invoice.id + '/markPaid').then(function() {
                controller.removeInvoiceFromScope(invoice);
            });
        };
    }];
});