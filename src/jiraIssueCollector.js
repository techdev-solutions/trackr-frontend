define(['jQuery'], function(jQuery) {
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

        jQuery.ajax({
            url: 'conf/trackr.json',
            type: 'get',
            dataType: 'json',
            success: function(response) {
                if(response.jiraIssueCollectorUrl) {
                    loadIssueCollector(response.jiraIssueCollectorUrl);
                }
            }
        });
    };
});
