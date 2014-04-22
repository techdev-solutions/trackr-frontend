define(['modules/base/services/user', 'modules/base/services/notificationService'], function(user, notificationService) {
    'use strict';
    return {
        init: function(module) {
            module.service('base.services.user', user);
            module.service('base.services.notification', notificationService);
        }
    };
});