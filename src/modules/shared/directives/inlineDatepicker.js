define([], function() {
    'use strict';
    /**
     * Represents an inline datepicker (i.e. a text field with a button to open the datepicker.
     * Attributes:
     * * model: The model that should be bound to the datepicker.
     */
    return [function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'src/modules/shared/partials/inlineDatepicker.tpl.html',
            scope: { model: '=' },
            controller: ['$scope', function($scope) {
                $scope.opened = false;
                $scope.openDate = function($event) {
                    $event.stopPropagation();
                    $event.preventDefault();
                    $scope.opened = true;
                };
                $scope.dateOptions = {
                    'year-format': '\'yyyy\'',
                    'starting-day': 1
                };
            }]
        };
    }];
});