define([], function() {
    'use strict';
    return ['$scope', 'Restangular', '$filter', function($scope, Restangular, $filter) {
        var controller = this;

        $scope.company = {
            address: {}
        };

        controller.onFail = function(response) {
            if (response.status === 409) {
                $scope.errors = [
                    {
                        entity: 'company',
                        message: $filter('translate')('COMPANY.COMPANY_ID_CONFLICT'),
                        property: 'company.companyId'
                    }
                ];
            } else {
                $scope.errors = response.data.errors;
            }
        };

        $scope.saveEntity = function() {
            Restangular.allUrl('companies', 'api/companies/createWithAddress').post({
                company: $scope.company,
                address: $scope.company.address
            }).then(function(company) {
                $scope.closeModal(company);
            }, controller.onFail);
        };
    }];
});