describe('WelcomeController', function() {
    'use strict';
    var UserService, $httpBackend;
    beforeEach(module('trackr'));

    beforeEach(inject(function($injector, FIXTURES_EMPLOYEES) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', '/api/users/').respond(FIXTURES_EMPLOYEES);
        UserService = $injector.get('UserService');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should load all employees', function () {
        var users;
        UserService.allUsers().then(function(_users) {
            users = _users;
        });
        $httpBackend.flush();
        expect(users).toBeDefined();
        expect(users.length).toBeGreaterThan(0);
    });
});