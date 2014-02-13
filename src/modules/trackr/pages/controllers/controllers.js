define(['modules/trackr/pages/controllers/welcome'], function(WelcomeController) {
    'use strict';
    return {
        init: function(module) {
            module.controller('trackr.pages.controllers.welcome', WelcomeController);
        }
    };
});