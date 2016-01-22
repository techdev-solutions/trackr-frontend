define([], function () {
    'use strict';
    function configValueFilter(configuration) {
        return function (configKey) {
            if (configuration.hasOwnProperty(configKey)) {
                return configuration[configKey];
            } else {
                throw new Error('Configuration key ' + configKey + ' not found.');
            }
        };
    }

    configValueFilter.$inject = ['base.config'];
    return configValueFilter;
});