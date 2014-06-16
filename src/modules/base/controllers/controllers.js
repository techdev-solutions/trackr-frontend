define(['modules/base/controllers/navigation', 'modules/base/controllers/breadcrumbController',
        'modules/base/controllers/confirmationDialogController'],
    function(NavigationController, BreadcrumbController, ConfirmationDialogController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('base.controllers.navigation', NavigationController);
                module.controller('base.controllers.breadcrumb-controller', BreadcrumbController);
                module.controller('base.controllers.confirmation-dialog', ConfirmationDialogController);
            }
        };
    });