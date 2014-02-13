define(['fixtures', 'app', 'angular-mocks'], function (fixtures) {
    'use strict';
    describe('WelcomeController', function () {
        var UserService, $httpBackend;
        beforeEach(module('app'));

        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', '/api/users/').respond(fixtures.employees);
            UserService = $injector.get('base.services.user');
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should load all employees', function () {
            var users;
            UserService.allUsers().then(function (_users) {
                users = _users;
            });
            $httpBackend.flush();
            expect(users).toBeDefined();
            expect(users.length).toBeGreaterThan(0);
        });
    });
});