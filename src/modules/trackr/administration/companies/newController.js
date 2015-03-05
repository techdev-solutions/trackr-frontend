define([], function() {
    'use strict';
    return ['$scope', 'Restangular', '$filter', function($scope, Restangular, $filter) {
        var controller = this;

        $scope.company = {};
        $scope.address = {};

        controller.onFail = function(response) {
            if (response.status === 409) {
                $scope.errors = [
                    {
                        entity: 'company',
                        message: $filter('translate')('COMPANY.COMPANY_ID_CONFLICT'),
                        property: 'companyId'
                    }
                ];
            } else {
                $scope.errors = response.data.errors;
            }
        };

        $scope.saveEntity = function() {
            // TODO: address exists now even if the company does not!
            Restangular.all('addresses')
                .post($scope.address)
                .then(function(address) {
                    $scope.company.address = address._links.self.href;
                    return Restangular.all('companies').post($scope.company);
                })
                .then(function(company) {
                    return $scope.closeModal(company);
                })
                .catch(controller.onFail);
        };
    }];
});