define(['angular'], function(angular) {
    'use strict';
    /**
     * Container for notifications. Appends notifications to itself on the event "td.notifiy".
     */
    return ['$compile', function($compile) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                scope.$on('td.notify', function(event, notification) {
                    var $notification = angular.element('<li td-notification></li>');
                    var childScope = scope.$new();
                    childScope.notification = notification;
                    $compile($notification)(childScope);
                    element.append($notification);
                });
            }
        };
    }];
});