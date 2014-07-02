define(['lodash'], function(_) {
    'use strict';
    return ['Restangular', '$scope', function(Restangular, $scope) {
        var controller = this;

        controller.mapInvoiceTotalsToDebitor = function(invoices) {
            return _.mapValues(
                _.groupBy(invoices, function(invoice) {
                    return invoice.debitor.name;
                }),
                function(invoicesByDebitor) {
                    return _.reduce(invoicesByDebitor, function(sum, invoice) {
                        return sum + invoice.invoiceTotal;
                    }, 0);
                }
            );
        };

        Restangular.allUrl('invoices', 'api/invoices/search/findByCreationDateBetween')
            .getList({
                start: '2014-01-01',
                end: '2014-06-30',
                projection: 'withDebitor'
            })
            .then(function(invoices) {
                $scope.invoices = controller.mapInvoiceTotalsToDebitor(invoices);
            });
    }];
});