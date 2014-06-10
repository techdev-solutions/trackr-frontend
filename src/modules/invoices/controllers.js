define([
    'modules/invoices/indexController', 'modules/invoices/newController'
], function(IndexController, NewController) {
    'use strict';
    return {
        init: function(module) {
            module.controller('invoices.controllers.index', IndexController);
            module.controller('invoices.controllers.new', NewController);
        }
    };
});