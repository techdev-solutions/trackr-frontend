define([], function() {
    'use strict';
    return  {
        /**
         * Just executes the callback in the result.
         * @returns {{result: {then: then}}}
         */
        openConfirmationDialog: function() {
            return {
                result: {
                    then: function(cb) {
                        cb();
                    }
                }
            };
        }
    };
});
