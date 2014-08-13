define(['jQuery'], function(jQuery) {
    'use strict';
    return function() {
        jQuery.ajax({
            type: 'get',
            cache: true,
            dataType: 'script'
        });
    };
});
