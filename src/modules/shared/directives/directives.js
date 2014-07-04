define([
    'modules/shared/directives/bsText',
    'modules/shared/directives/bsEdit',
    'modules/shared/directives/bsCheckbox',
    'modules/shared/directives/autosize',
    'modules/shared/directives/inlineDatepicker',
    'modules/shared/directives/dateInterval',
    'modules/shared/directives/errorDisplay',
    'modules/shared/directives/tableSort'
], function(bsText, bsEdit, bsCheckbox, autosize, inlineDatepicker, dateInterval, errorDisplay, tableSort) {
    'use strict';
    return {
        init: function(module) {
            module.directive('bsText', bsText);
            module.directive('bsEdit', bsEdit);
            module.directive('bsCheckbox', bsCheckbox);
            module.directive('autosize', autosize);
            module.directive('inlineDatepicker', inlineDatepicker);
            module.directive('dateInterval', dateInterval);
            module.directive('errorDisplay', errorDisplay);
            module.directive('tableSort', tableSort);
        }
    };
});