define([], function () {
    'use strict';
    return ['Restangular', '$scope', '$controller', function (Restangular, $scope, $controller) {
        $controller('trackr.administration.controllers.employees.roles-base', {$scope: $scope});

        //Load all credentials and subsequently all authorities for each credential.
        Restangular.all('credentials').getList().then(function(credentials) {
            credentials.forEach(function(credential) {
                credential.all('authorities').getList().then(function(authorities) {
                    credential.authorities = authorities;
                });
            });
            $scope.credentials = credentials;
        });
    }];
});