define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('base.services.user', function() {
        var UserService;
        baseTestSetup();
        beforeEach(inject(function($injector) {
            UserService = $injector.get('base.services.user');
        }));

        it('must have a setUser method', function() {
            expect(UserService.setUser).toBeDefined();
        });
    });
});