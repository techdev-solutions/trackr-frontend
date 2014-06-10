define([], function () {
    'use strict';
    return ['$scope', 'Restangular', '$modalInstance', '$filter', function($scope, Restangular, $modalInstance, $filter) {
        $scope.errors = [];
        $scope.company = {
            address: {} //address may not be null. Won't be used in the controller.
        };
        $scope.address = {};

        $scope.saveCompany = function() {
            Restangular.allUrl('companies', 'api/companies/createWithAddress').post({
                company: $scope.company,
                address: $scope.address
            }).then(function(company) {
                $modalInstance.close(company);
            }, function(response) {
                if(response.status === 409) {
                    $scope.errors = [{
                        entity: 'company',
                        message: $filter('translate')('COMPANY.COMPANY_ID_CONFLICT'),
                        property: 'company.companyId'
                    }];
                } else {
                    $scope.errors = response.data.errors;
                }
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss();
        };
    }];
});