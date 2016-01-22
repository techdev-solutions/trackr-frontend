define(['jQuery', 'configuration'], function(jQuery, config) {
    'use strict';
    return function() {
        function loadIssueCollector(url) {
            return jQuery.ajax({
                url: url,
                type: 'get',
                cache: true,
                dataType: 'script'
            });
        }

        if(config.jiraIssueCollectorUrl) {
            loadIssueCollector(config.jiraIssueCollectorUrl);
        }
    };
});
