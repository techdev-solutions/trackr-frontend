define(['modules/base/controllers/navigation'], function(NavigationController) {
    'use strict';
    return {
        init: function(module) {
            module.controller('base.controllers.navigation', NavigationController);
        }
    };
});