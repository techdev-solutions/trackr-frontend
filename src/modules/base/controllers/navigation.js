define([], function () {
    'use strict';
    return ['$scope', '$location', function ($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return (viewLocation === $location.path());
        };
    }];
});
