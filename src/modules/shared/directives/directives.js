define(['modules/shared/directives/bsText', 'modules/shared/directives/bsEdit', 'modules/shared/directives/bsCheckbox'], function(bsText, bsEdit, bsCheckbox) {
    'use strict';
    return {
        init: function(module) {
            module.directive('bsText', bsText);
            module.directive('bsEdit', bsEdit);
            module.directive('bsCheckbox', bsCheckbox);
        }
    };
});