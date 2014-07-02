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

        /**
         * Load invoices from start to end.
         *
         * Map the invoices to the required format and generate the piechart data
         * @param {Date} end
         * @param {Date} start
         */
        controller.loadInvoices = function(start, end) {
            Restangular.allUrl('invoices', 'api/invoices/search/findByCreationDateBetween')
                .getList({
                    start: start.getTime(),
                    end: end.getTime(),
                    projection: 'withDebitor'
                })
                .then(function(invoices) {
                    var mappedInvoices = controller.mapInvoiceTotalsToDebitor(invoices);
                    $scope.invoices = mappedInvoices;
                    $scope.pieChartData = generatePieData(mappedInvoices);
                });
        };

        function generatePieData(invoices) {
            var data = [];
            _.forIn(invoices, function(value, debitorName) {
                data.push({
                    x: debitorName,
                    y: [value.toFixed(2)]
                });
            });
            return {
                series: [],
                data: data
            };
        }

        $scope.pieChartData = { series: [], data: [] };

        $scope.pieChartConfig = {
            tooltips: false,
            labels: true,
            legend: {
                display: true,
                position: 'left'
            },
            innerRadius: 0
        };

        controller.loadInvoices(moment().startOf('month').toDate(), moment().endOf('month').toDate());
    }];
});