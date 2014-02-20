define([], function () {
    'use strict';
    return ['$scope', 'Restangular', '$modalInstance', function($scope, Restangular, $modalInstance) {
        $scope.errors = {};
        $scope.company = {
            address: {

            }
        };

        $scope.saveCompany = function() {
            Restangular.all('companies').post($scope.company).then(function(company) {
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