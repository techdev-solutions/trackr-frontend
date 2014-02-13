define(['modules/base/services/user'], function(user) {
    'use strict';
    return {
        init: function(module) {
            module.service('base.services.user', user);
        }
    };
});