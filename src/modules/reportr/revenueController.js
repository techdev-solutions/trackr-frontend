define(['lodash', 'moment'], function(_, moment) {
    'use strict';
    return ['Restangular', '$scope', function(Restangular, $scope) {
        var controller = this;

        /**
         * Takes a list of invoices and returns a map of the debitor name to the summed invoiceTotal
         *
         * [ {debitor: { name: 'd1' }, invoiceTotal: 3}, {debitor: { name: 'd2' }, invoiceTotal: 4}]
         * ->
         * { 'd1': 3, 'd2': 4 }
         * @param invoices The invoices to convert
         * @return {Object} A mapping of debitor names to numbers (sum of the invoices for that debitor)
         */
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

        $scope.dateSelected = function(start, end) {
            controller.loadInvoices(start, end);
        };

        controller.loadInvoices = function(start, end) {
            Restangular.allUrl('invoices', 'api/invoices/search/findByCreationDateBetween')
                .getList({
                    start: start.getTime(),
                    end: end.getTime(),
                    projection: 'withDebitor'
                })
                .then(function(invoices) {
                    $scope.invoices = controller.mapInvoiceTotalsToDebitor(invoices);
                });
        };

        controller.loadInvoices(moment().startOf('month').toDate(), moment().endOf('month').toDate());
    }];
});