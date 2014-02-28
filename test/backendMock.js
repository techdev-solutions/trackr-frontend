define([], function() {
    'use strict';
    return function($httpBackend) {
        $httpBackend.when('GET', '/api/principal').respond({
            id: 0,
            email: 'admin@techdev.de',
            enabled: true,
            authorities: [ {authority: 'ROLE_ADMIN', order: 0, id: 0, screenName: 'Admin'}]
        });
    };
});