define(['app', 'angular-mocks'], function() {
    'use strict';
    describe('base.controllers.navigation', function () {
        var NavigationController, scope;
        beforeEach(module('app'));
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            NavigationController = $controller('base.controllers.navigation', {
                $scope: scope
            });
        }));

        it('should have the isActive function in scope', function() {
            expect(scope.isActive).toBeDefined();
        });
    });
});
