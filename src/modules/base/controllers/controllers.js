define(['modules/base/controllers/navigation', 'modules/base/controllers/breadcrumbController'],
    function(NavigationController, BreadcrumbController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('base.controllers.navigation', NavigationController);
                module.controller('base.controllers.breadcrumb-controller', BreadcrumbController);
            }
        };
    });