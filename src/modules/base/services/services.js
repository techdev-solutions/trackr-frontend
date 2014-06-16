define(['modules/base/services/user', 'modules/base/services/notificationService', 'modules/base/services/confirmationDialogService'],
    function(user, notificationService, confirmationService) {
        'use strict';
        return {
            init: function(module) {
                module.service('base.services.user', user);
                module.service('base.services.notification', notificationService);
                module.service('base.services.confirmation-dialog', confirmationService);
            }
        };
    });