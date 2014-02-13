define([], function () {
    'use strict';
    return ['$scope', 'base.services.user', function ($scope, UserService) {
        $scope.user = UserService.getUser();
    }];
});