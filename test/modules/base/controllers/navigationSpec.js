define(['app', 'angular-mocks'], function() {
    'use strict';
    describe('base.controllers.navigation', function () {
        var NavigationController, scope, UserService;
        beforeEach(module('app'));
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

        it('should have the isActive function in scope', function() {
            expect(scope.isActive).toBeDefined();
        });

        it('should put the active user into scope', function() {
            expect(UserService.getUser).toHaveBeenCalled();
            expect(scope.user).toBeDefined();
        });
    });
});
