define(['backendMock', 'angular-mocks', 'app'], function(backendMock) {
    'use strict';
    return function() {
        beforeEach(module('app'));
        beforeEach(inject(function($httpBackend, $injector) {
            backendMock($httpBackend);
            var UserService = $injector.get('base.services.user');
            UserService.setUser({
                id: 0,
                email: 'admin@techdev.de',
                enabled: true,
                authorities: [
                    {authority: 'ROLE_ADMIN', order: 0, id: 0, screenName: 'Admin'}
                ]
            });
        }));
        afterEach(inject(function($httpBackend) {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        }));
    };
});