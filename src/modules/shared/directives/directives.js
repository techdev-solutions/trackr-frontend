define([
    'modules/shared/directives/bsText',
    'modules/shared/directives/bsEdit',
    'modules/shared/directives/bsCheckbox',
    'modules/shared/directives/autosize'
], function(bsText, bsEdit, bsCheckbox, autosize) {
    'use strict';
    return {
        init: function(module) {
            module.directive('bsText', bsText);
            module.directive('bsEdit', bsEdit);
            module.directive('bsCheckbox', bsCheckbox);
            module.directive('autosize', autosize);
        }
    };
});