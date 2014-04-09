define(['angular'], function(angular) {
    'use strict';
    /**
     * This directive is used on form-group elements. It watches the scope.errors array and adds the has-error class to the form group element
     * if an error for the given property is found. The property is passed by name into the directive. It also adds an help-block
     * span element that contains the error text.
     */
    return ['$compile', function($compile) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var el = angular.element('<span class="help-block">{{errorText(\'' + attrs.errorDisplay + '\')}}</span>');

                scope.hasError = function(property, errors) {
                    for (var i = 0; i < errors.length; i++) {
                        if (errors[i].property === property) {
                            return true;
                        }
                    }
                    return false;
                };

                scope.errorText = function(property) {
                    if (scope.hasError(property, scope.errors)) {
                        for (var i = 0; i < scope.errors.length; i++) {
                            if (scope.errors[i].property === property) {
                                return scope.errors[i].message;
                            }
                        }
                    } else {
                        return '';
                    }
                };

                scope.$watch('errors', function(newErrors) {
                    if (scope.hasError(attrs.errorDisplay, newErrors)) {
                        element.addClass('has-error');
                    } else {
                        element.removeClass('has-error');
                    }
                });

                $compile(el)(scope);
                element.append(el);
            }
        };
    }];
});