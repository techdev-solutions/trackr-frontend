define([], function () {
    'use strict';
    return {
        setLanguageForUser: function ($translate, trackrUser) {
            $translate.use(trackrUser.locale);
        }
    };
});