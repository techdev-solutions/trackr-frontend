define(['moment', 'modules/reportr/lodashHelpers', 'modules/reportr/sortHelper'], function(moment, LodashHelpers, SortHelper) {
    'use strict';
    return ['Restangular', '$scope', function(Restangular, $scope) {
        var controller = this;

        // see date-interval directive
        $scope.dateSelected = function(start, end) {
            controller.loadInvoices(start, end);
        };

        // See table-sort directive
        $scope.sortBy = function(property, direction) {
            SortHelper.sortArrayOfArrays($scope.invoices, property, direction);
        };

        /**
         * Load invoices for the given period.
         *
         * Map the invoices to the required format and generate the piechart data
         * @param {Date} start Start of the period
         * @param {Date} end End of the period
         */
        controller.loadInvoices = function(start, end) {
            Restangular.allUrl('invoices', 'api/invoices/search/findByCreationDateBetween')
                .getList({
                    start: start.getTime(),
                    end: end.getTime(),
                    projection: 'withDebitor'
                })
                .then(function(invoices) {
                    $scope.invoices = LodashHelpers
                        .mapAndReduceValuesToSum(invoices, function(invoice) {
                            return invoice.debitor.name;
                        }, 'invoiceTotal');
                    SortHelper.sortArrayOfArrays($scope.invoices, 1, 1);
                    $scope.pieChartData = controller.generatePieData($scope.invoices);
                });
        };

        /**
         * Generate the data for the piechart. Works on the data returned by {@link mapAndReduceValuesToSum}
         * @param {Array} invoicesArray The array with the data for the invoices
         * @return {{series: Array, data: Array}} Data for angular-charts to display.
         */
        controller.generatePieData = function(invoicesArray) {
            var data = [];
            invoicesArray.forEach(function(invoice) {
                data.push({
                    x: invoice[0],
                    y: [invoice[1].toFixed(2)]
                });
            });
            return {
                series: [],
                data: data
            };
        };

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