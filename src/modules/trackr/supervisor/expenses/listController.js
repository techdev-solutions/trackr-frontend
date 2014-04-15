define([], function() {
    'use strict';
    return ['$scope', 'reports', function($scope, reports) {
        $scope.reports = reports;
    }];
});