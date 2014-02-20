define([], function () {
    'use strict';
    return ['$scope', '$location', 'base.services.user', function ($scope, $location, UserService) {
        $scope.user = UserService.getUser();
    }];
});
