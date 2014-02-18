define([
    'modules/example/controllers/example'
], function(ExampleController) {
    'use strict';
    return {
        init: function(module) {
            module.controller('example.controllers.example', ExampleController);
        }
    };
});