define(['modules/trackr/pages/controllers/welcome', 'modules/trackr/pages/controllers/config'], function(WelcomeController, ConfigController) {
    'use strict';
    return {
        init: function(module) {
            module.controller('trackr.pages.controllers.welcome', WelcomeController);
            module.controller('trackr.pages.controllers.config', ConfigController);
        }
    };
});