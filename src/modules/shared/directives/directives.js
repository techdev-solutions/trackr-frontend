define([
    'modules/shared/directives/bsText',
    'modules/shared/directives/bsDecorate',
    'modules/shared/directives/bsCheckbox',
    'modules/shared/directives/inlineDatepicker',
    'modules/shared/directives/dateInterval',
    'modules/shared/directives/errorDisplay',
    'modules/shared/directives/tableSort',
    'modules/shared/directives/pdfDownload'
], function(bsText, bsDecorate, bsCheckbox, inlineDatepicker, dateInterval, errorDisplay, tableSort, pdfDownload) {
    'use strict';
    return {
        init: function(module) {
            module.directive('bsText', bsText);
            module.directive('bsDecorate', bsDecorate);
            module.directive('bsCheckbox', bsCheckbox);
            module.directive('inlineDatepicker', inlineDatepicker);
            module.directive('dateInterval', dateInterval);
            module.directive('errorDisplay', errorDisplay);
            module.directive('tableSort', tableSort);
            module.directive('pdfDownload', pdfDownload);
        }
    };
});