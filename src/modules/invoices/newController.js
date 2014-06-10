define([], function() {
    'use strict';
    return ['$scope', '$modalInstance', 'Restangular', '$filter', 'base.services.notification',
        function($scope, $modalInstance, Restangular, $filter, NotificationService) {
            $scope.errors = [];

            $scope.saveInvoice = function(invoice, debitor) {
                invoice = invoice || {};
                if (debitor) {
                    invoice.debitor = debitor._links.self.href;
                }
                invoice.invoiceState = 'OUTSTANDING';
                Restangular.all('invoices').post(invoice)
                    .then(function(response) {
                        $modalInstance.close(response);
                        NotificationService.info(
                            $filter('translate')('INVOICE.INVOICE_CREATED') + ' (' + $filter('translate')('INVOICE.' + response.invoiceState) + ')'
                        );
                    }, function(response) {
                        if (response.status === 409) {
                            $scope.errors = [
                                {
                                    entity: 'invoice',
                                    message: $filter('translate')('INVOICE.IDENTIFIER_CONFLICT'),
                                    property: 'identifier'
                                }
                            ];
                        } else {
                            $scope.errors = response.data.errors;
                        }
                    });
            };

            $scope.getCompanies = function(searchString) {
                return Restangular.allUrl('companies', 'api/companies/search/findByNameLikeOrderByNameAsc').getList({name: '%' + searchString + '%'});
            };

            $scope.cancel = function() {
                $modalInstance.dismiss();
            };
        }];
});