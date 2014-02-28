define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('base.controllers.navigation', function () {
        var NavigationController, scope, UserService;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            UserService = {
                getUser: function() {
                    return {
                        email: 'admin'
                    };
                }
            };
            spyOn(UserService, 'getUser').andCallThrough();
            NavigationController = $controller('base.controllers.navigation', {
                $scope: scope,
                'base.services.user': UserService
            });
        }));

        it('should put the active user into scope', function() {
            expect(UserService.getUser).toHaveBeenCalled();
            expect(scope.user).toBeDefined();
        });
    });
});
