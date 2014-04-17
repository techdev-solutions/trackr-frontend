define(['modules/base/directives/hasAuthority',
    'modules/base/directives/tdNotifications',
    'modules/base/directives/tdNotification'], function(hasAuthority, tdNotifications, tdNotification) {
    'use strict';
    return {
        init: function(module) {
            module.directive('hasAuthority', hasAuthority);
            module.directive('tdNotifications', tdNotifications);
            module.directive('tdNotification', tdNotification);
        }
    };
});