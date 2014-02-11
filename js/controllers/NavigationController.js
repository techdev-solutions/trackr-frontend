trackr.controller('NavigationController', ['$scope', '$location', function ($scope, $location) {
    'use strict';
    $scope.isActive = function (viewLocation) {
        return (viewLocation === $location.path());
    };
}]);