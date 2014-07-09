/* jshint camelcase: false */
define([], function() {
    'use strict';
    /**
     * Directive that appends an down- and up-arrow to the element it's applied to. When one clicks one of the arrows a callback is called
     * with the string given as the directive value as the first argument and 1 for the down arrow (desc), 1 for the up arrow (asc).
     *
     * The callback can optionally be defined by "sort-callback", otherwise the directive expects a function called "sortBy" in the scope.
     */
    return [function() {
        function link(scope, element, attrs) {
            scope._ts_sortBy = function(prop, dir) {
                if(attrs.sortCallback) {
                    scope[attrs.sortCallback](prop, dir);
                } else {
                    scope.sortBy(prop, dir);
                }
            };
        }
        return {
            restrict: 'A',
            compile: function(element, attrs) {
                element.append(
                        '<span style="cursor: pointer" ng-click="_ts_sortBy(\'' + attrs.tableSort + '\', 1)" class="glyphicon glyphicon-chevron-down"></span>' +
                        '<span style="cursor: pointer" ng-click="_ts_sortBy(\'' + attrs.tableSort + '\', -1)" class="glyphicon glyphicon-chevron-up"></span>'
                );
                return link;
            }
        };
    }];
});