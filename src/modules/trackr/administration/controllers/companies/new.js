define([], function () {
    'use strict';
    return ['$scope', 'Restangular', '$modalInstance', function($scope, Restangular, $modalInstance) {
        $scope.errors = {};
        $scope.company = {
            address: {} //address may not be null. Won't be used in the controller.
        };
        $scope.address = {};

        $scope.saveCompany = function() {
            Restangular.allUrl('companies', '/api/companies/createWithAddress').post({
                company: $scope.company,
                address: $scope.address
            }).then(function(company) {
                $modalInstance.close(company);
            }, function(response) {
                $scope.errors = response.data;
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss();
        };
    }];
});