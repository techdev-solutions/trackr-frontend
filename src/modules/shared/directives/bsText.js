define([], function() {
    'use strict';
    /**
     * Bootstrap text input with validation error messages.
     * <p>
     * Attributes:
     * * propertyName: The name/path that the property will have in the error message object. E.g. 'address.street' or 'firstName'
     * * translateCode: code to lookup in angular-translate, e.g. 'ADDRESS.STREET'
     * * path: reference to the model property that this field represents, e.g. address.street.
     * * inline: if the label should have the class sr-only (inline) or form-label (!inline). If not provided: false
     * * errors: A reference to the array containing potential validation errors. If not provided, $scope.$parent.errors will be used.
     */
    return [function() {
        return {
            restrict: 'E',
            templateUrl: 'src/modules/shared/partials/bsText.tpl.html',
            scope: {propertyName: '@', translateCode: '@', path: '=', inline: '@'},
            controller: ['$scope', function($scope) {
                $scope.inline = $scope.inline || false;
                $scope.$parent.$watch('errors', function() {
                    $scope.errors = $scope.$parent.errors;
                });
            }]
        };
    }];
});