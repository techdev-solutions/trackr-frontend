define(['lodash', 'moment', 'modules/shared/utils/lodashHelpers'], function(_, moment, LodashHelpers) {
    'use strict';
    return ['Restangular', '$scope', function(Restangular, $scope) {
        var controller = this;

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
                    var mappedInvoices = LodashHelpers.mapAndReduceValuesToSum(invoices, function(invoice) { return invoice.debitor.name; }, 'invoiceTotal');
                    $scope.invoices = mappedInvoices;
                    $scope.pieChartData = controller.generatePieData(mappedInvoices);
                });
        };

        controller.generatePieData = function(invoices) {
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