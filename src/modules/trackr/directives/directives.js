define([
    'modules/trackr/directives/commentSection'
], function(commentSection) {
    'use strict';
    return {
        init: function(module) {
            module.directive('commentSection', commentSection);
        }
    };
});