define([], function() {
    'use strict';
    /**
     * One notification element.
     */
    return [function() {
        return {
            restrict: 'A',
            templateUrl: 'src/modules/base/partials/tdNotification.tpl.html',
            link: function(scope, element) {
                element.addClass(scope.notification.level);
                element.fadeIn(300).delay(scope.notification.duration).slideUp(300, function() {
                    element.remove();
                });
            }
        };
    }];
});