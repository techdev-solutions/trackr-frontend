define(['./configValueFilter'], function (configValue) {
    'use strict';

    return {
        init: function(module) {
            module.filter('configValue', configValue);
        }
    };
});