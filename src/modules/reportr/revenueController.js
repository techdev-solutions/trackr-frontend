define(['./lodashHelpers', './sortHelper'], function(LodashHelpers, SortHelper) {
    'use strict';
    var revenueController = function(Restangular, $scope, intervalLocationService) {
        var controller = this;

        // see date-interval directive
        $scope.dateSelected = function(start, end) {
            intervalLocationService.saveIntervalToLocation(start, end);
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
                    $scope.totalRevenue = $scope.invoices.reduce(function(prev, inv) {
                        return prev + inv[1];
                    }, 0);
                    $scope.pieChartData = controller.generatePieData($scope.invoices);
                });
        };

        /**
         * Generate the data for the piechart. Works on the data returned by {@link mapAndReduceValuesToSum}
         * @param {Array} invoicesArray The array with the data for the invoices
         * @return Array Data for the pie chart directive
         */
        controller.generatePieData = function(invoicesArray) {
            return invoicesArray.map(function(invoice) {
                return {
                    label: invoice[0],
                    value: invoice[1].toFixed(2)
                };
            });
        };

        $scope.pieChartData = [];

        $scope.totalRevenue = 0;

        $scope.interval = intervalLocationService.loadIntervalFromLocation();
        controller.loadInvoices($scope.interval.start, $scope.interval.end);
    };
    revenueController.$inject = ['Restangular', '$scope', 'reportr.intervalLocationService'];
    return revenueController;
});