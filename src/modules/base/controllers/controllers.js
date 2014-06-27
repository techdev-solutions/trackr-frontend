define(['modules/base/controllers/navigation', 'modules/base/controllers/breadcrumbController',
        'modules/base/controllers/confirmationDialogController', 'modules/base/controllers/authorizationController'],
    function(NavigationController, BreadcrumbController, ConfirmationDialogController, AuthorizationController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('base.controllers.navigation', NavigationController);
                module.controller('base.controllers.breadcrumb-controller', BreadcrumbController);
                module.controller('base.controllers.confirmation-dialog', ConfirmationDialogController);
                module.controller('base.controllers.authorization', AuthorizationController);
            }
        };
    });