define([], function() {
    'use strict';
    /**
     * Add the two methods hasError and errorText to the scope that can work with our standard error returns.
     */
    return function($scope) {
        $scope.hasError = function (property) {
            for (var i = 0; i < $scope.errors.length; i++) {
                if($scope.errors[i].property === property) {
                    return true;
                }
            }
            return false;
        };

        $scope.errorText = function(property) {
            if($scope.hasError(property)) {
                for (var i = 0; i < $scope.errors.length; i++) {
                    if($scope.errors[i].property === property) {
                        return $scope.errors[i].message;
                    }
                }
            } else {
                return '';
            }
        };
    };
});