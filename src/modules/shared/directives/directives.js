define(['modules/shared/directives/bsText'], function(bsText) {
    'use strict';
    return {
        init: function(module) {
            module.directive('bsText', bsText);
        }
    };
});