define([], function () {
    'use strict';
    return ['$scope', 'Restangular', '$modalInstance', '$log', function($scope, Restangular, $modalInstance, $log) {
        $scope.errors = {};
        $scope.addressErrors = {};
        $scope.company = {};
        $scope.address = {};

        $scope.saveCompany = function() {
            function persistCompany() {
                // Set the address relationship.
                $scope.company.address = $scope.address._links.self.href;
                Restangular.all('companies').post($scope.company).then(function(company) {
                    $modalInstance.close(company);
                }, function(response) {
                    $scope.errors = response.data;
                });
            }

            /*
                If the address was already persisted but there were validation errors when saving the company don't
                save the address a second time.
             */
            if(!$scope.address._persisted) {
                Restangular.all('addresses').post($scope.address).then(function(address) {
                    $scope.addressErrors = {};
                    $scope.address = address;
                    $scope.address._persisted = true;
                    persistCompany();
                }, function(response) {
                    $scope.addressErrors = response.data;
                });
            } else {
                persistCompany();
            }
        };

        $scope.cancel = function() {
            if($scope.address._persisted) {
                $log.debug('Address was saved but company creation cancelled, deleting address');
                $scope.address.remove();
            }
            $modalInstance.dismiss();
        };
    }];
});