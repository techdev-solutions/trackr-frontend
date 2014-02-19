define([], function() {
    'use strict';
    return [function() {
        return {
            restrict: 'E',
            templateUrl: '/src/modules/shared/partials/bsText.tpl.html',
            scope: {propertyName: '@', translateCode: '@', path: '='},
            controller: ['$scope', function($scope) {
                $scope.hasError = function (property) {
                    return $scope.$parent.errors[property] !== undefined;
                };

                $scope.errorText = function(property) {
                    if($scope.hasError(property)) {
                        return $scope.$parent.errors[property].defaultMessage;
                    } else {
                        return '';
                    }
                };
            }]
        };
    }];
});