define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('base.services.user', function() {
        var UserService;
        baseTestSetup();
        beforeEach(inject(function($injector) {
            UserService = $injector.get('base.services.user');
        }));

        it('setUser must define highestAuthority on the user object', function() {
            var user = UserService.getUser();
            user.authorities = [{authority: 'ROLE_EMPLOYEE', order: 2, id: 2}, {authority: 'ROLE_SUPERVISOR', order: 1, id: 1}];
            UserService.setUser(user);
            expect(user.highestAuthority).toBeDefined();
            expect(user.highestAuthority.authority).toBe('ROLE_SUPERVISOR');
        });

        it('hasAuthority must return true for all if user is admin', function() {
            var hasAuthority = UserService.userHasAuthority('ROLE_ADMIN');
            expect(hasAuthority).toBe(true);
            hasAuthority = UserService.userHasAuthority('ROLE_SUPERVISOR');
            expect(hasAuthority).toBe(true);
            hasAuthority = UserService.userHasAuthority('ROLE_EMPLOYEE');
            expect(hasAuthority).toBe(true);
        });

        it('must return false for userHasAuthority if user has no authorities', function() {
            var user = UserService.getUser();
            user.authorities = [];
            UserService.setUser(user);
            var hasAuthority = UserService.userHasAuthority('ROLE_EMPLOYEE');
            expect(hasAuthority).toBe(false);
        });
    });
});