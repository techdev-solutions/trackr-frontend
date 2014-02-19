define(['app', 'angular-mocks'], function () {
    'use strict';
    describe('base.services.user', function () {
        var UserService;
        beforeEach(module('app'));

        beforeEach(inject(function ($injector) {
            UserService = $injector.get('base.services.user');
        }));

        it('must have a setUser method', function() {
            expect(UserService.setUser).toBeDefined();
        });
    });
});