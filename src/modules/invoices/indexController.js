define(['modules/shared/PaginationLoader'], function (PaginationLoader) {
    'use strict';
    return ['$scope', '$modal', 'Restangular', function($scope, $modal, Restangular) {
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
    }];
});