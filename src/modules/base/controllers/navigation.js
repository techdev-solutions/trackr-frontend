define([], function () {
    'use strict';
    return ['$scope', '$location', 'base.services.user', function ($scope, $location, UserService) {
        $scope.isActive = function (viewLocation) {
            return (viewLocation === $location.path());
        };
        $scope.user = UserService.getUser();
    }];
});
