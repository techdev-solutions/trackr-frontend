define([], function () {
    'use strict';
    return ['Restangular', '$scope', '$controller', function (Restangular, $scope, $controller) {
        $controller('trackr.administration.controllers.employees.roles-base', {$scope: $scope});

        //Load all credentials and subsequently all authorities for each credential.
        Restangular.all('credentials').getList({ projection: 'allRolesOverview' }).then(function(credentials) {
            $scope.credentials = credentials;
        });
    }];
});