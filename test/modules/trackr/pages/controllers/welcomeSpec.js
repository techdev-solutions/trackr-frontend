define(['app', 'angular-mocks'], function() {
    'use strict';
    describe('trackr.pages.controllers.welcome', function () {
        var UserService, WelcomeController, scope;

        beforeEach(module('app'));

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            UserService = {
                getUser: function() {
                    return {};
                }
            };
            spyOn(UserService, 'getUser').andCallThrough();
            WelcomeController = $controller('trackr.pages.controllers.welcome', {
                $scope: scope,
                'base.services.user': UserService
            });
        }));

        it('should load the active user', function() {
            expect(UserService.getUser).toHaveBeenCalled();
        });
    });
});
