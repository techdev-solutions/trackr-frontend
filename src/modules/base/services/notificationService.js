define([], function() {
    'use strict';
    return [function() {
        var callback;
        function displayNotification(text, level, duration) {
            var _duration = duration || 5000;
            var notification =  {
                text: text,
                duration: _duration,
                level: level
            };
            if(callback) {
                callback(notification);
            }
        }
        return {
            onNotification: function(_callback) {
                callback = _callback;
            },

            /**
             * Display an info message to the user.
             * @param text The text to display
             * @param [duration] The duration, defaults to 5 seconds.
             */
            info: function(text, duration) {
                displayNotification(text, 'info', duration);
            },

            /**
             * Display an error message to the user.
             * @param text The text to display
             * @param [duration] The duration, defaults to 5 seconds.
             */
            error: function(text, duration) {
                displayNotification(text, 'error', duration);
            },

            /**
             * Display a fatal message to the user.
             * @param text The text to display
             * @param [duration] The duration, defaults to 5 seconds.
             */
            fatal: function(text, duration) {
                displayNotification(text, 'fatal', duration);
            }
        };
    }];
});