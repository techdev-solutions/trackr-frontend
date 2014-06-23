define(['lodash'], function(_) {
    'use strict';
    return ['$scope', 'Restangular', '$filter', 'base.services.notification',
        function($scope, Restangular, $filter, NotificationService) {
            var controller = this;
            $scope.invoice = {};

            controller.onFail = function(response) {
                if (response.status === 409) {
                    $scope.errors = [{
                            entity: 'invoice',
                            message: $filter('translate')('INVOICE.IDENTIFIER_CONFLICT'),
                            property: 'identifier'
                        }];
                } else {
                    $scope.errors = response.data.errors;
                }
            };

            controller.saveInvoice = function(invoice) {
                var invoiceEntity = _.clone(invoice, false);

                if(invoice.debitor) {
                    invoiceEntity.debitor = invoice.debitor._links.self.href;
                }

                invoiceEntity.invoiceState = 'OUTSTANDING';
                Restangular.all('invoices').post(invoiceEntity)
                    .then(function(response) {
                        $scope.closeModal(response);
                        NotificationService.info(
                                $filter('translate')('INVOICE.INVOICE_CREATED') + ' (' + $filter('translate')('INVOICE.' + response.invoiceState) + ')'
                        );
                    }, controller.onFail);
            };

            $scope.saveEntity = function() {
                controller.saveInvoice($scope.invoice);
            };

            $scope.getCompanies = function(searchString) {
                return Restangular.allUrl('companies', 'api/companies/search/findByNameLikeIgnoreCaseOrderByNameAsc')
                    .getList({name: '%' + searchString + '%'});
            };
        }];
});