define([], function () {
    'use strict';
    return ['Restangular', '$scope', '$stateParams', '$controller', function (Restangular, $scope, $stateParams, $controller) {
        $controller('trackr.administration.controllers.employees.roles-base', {$scope: $scope});

        /*
            Initial load of employee and associated data.
         */
        Restangular.one('employees', $stateParams.id).get().then(function(employee) {
            $scope.employee = employee;
            employee.one('credential').get().then(function(credential) {
                $scope.credential = credential;
                Restangular.one('credentials', credential.id).all('authorities').getList().then(function(authorities) {
                    $scope.credential.authorities = authorities;
                });
            });
        });
    }];
});