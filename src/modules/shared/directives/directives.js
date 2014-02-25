define(['modules/shared/directives/bsText', 'modules/shared/directives/bsEdit'], function(bsText, bsEdit) {
    'use strict';
    return {
        init: function(module) {
            module.directive('bsText', bsText);
            module.directive('bsEdit', bsEdit);
        }
    };
});