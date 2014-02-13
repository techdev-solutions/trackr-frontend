define(['modules/base/directives/hasAuthority'], function(hasAuthority) {
    'use strict';
    return {
        init: function(module) {
            module.directive('hasAuthority', hasAuthority);
        }
    };
});