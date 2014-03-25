define([], function () {
    'use strict';
    return {
        init: function (app, trackrUser) {
            app.config(['$translateProvider', function ($translateProvider) {
                $translateProvider.useUrlLoader('api/translations');
                $translateProvider.preferredLanguage(trackrUser.locale);
            }]);
        }
    };
});