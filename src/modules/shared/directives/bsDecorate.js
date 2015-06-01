define(['angular'], function(angular) {
    'use strict';
    // directive that surrounds an <input> tag with bootstrap divs to style it and attaches the error handling logic
    // from angular.
    var directive = function($compile) {
        return {
            restrict: 'A',
            compile: function(element, attributes) {
                var labelClass = 'form-label col-sm-2';
                var controlClass = 'col-sm-6';
                if(attributes.inline === 'true') {
                    labelClass = 'sr-only';
                    controlClass = '';
                }

                var formPath = 'form.' + attributes.name;
                // the input is invalid when it is marked as invalid and was edited, i.e. is marked as $dirty.
                var validExpression = formPath + '.$valid && ' + formPath + '.$dirty';
                var translationKey = attributes.bsDecorate;

                element.removeAttr('bs-decorate');

                if(attributes.type === 'text' || attributes.type === 'number') {
                    element.attr('placeholder', '{{ \'' + translationKey + '\' | translate }}');
                }

                element.addClass('form-control');

                var outerDiv = angular.element('<div class="form-group"></div>');
                var label = angular.element('<label class="' + labelClass + '" for="' + attributes.name + '" translate="' + translationKey + '"></label>');
                // todo: the has-error class actually has to be on the outer div according to bootstrap, but for some
                // todo: reason the ng-class directive does not work on the outer div!
                var innerDiv = angular.element('<div ng-class="{ \'has-error\': !'+validExpression+'}" class="' + controlClass + '"></div>');
                // todo where to get the error message from?
                var errorSpan = angular.element('<span class="form-error" ng-show="!' + validExpression + '">{{' + formPath + '.$error}}</span>');
                outerDiv.append(label).append(innerDiv).append(errorSpan);

                element.replaceWith(outerDiv);
                innerDiv.append(element);

                return function(scope) {
                    $compile(outerDiv)(scope);
                };
            }
        };
    };
    directive.$inject = ['$compile'];
    return directive;
});