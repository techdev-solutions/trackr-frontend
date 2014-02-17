define(['app', 'angular-mocks'], function() {
    'use strict';
    describe('trackr.pages.controllers.config', function () {
        var ConfigController, scope;

        beforeEach(module('app'));

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            ConfigController = $controller('trackr.pages.controllers.config', {
                $scope: scope
            });
        }));

        it('must have an updateCredentialAuthorities function', function() {
            expect(scope.updateCredentialAuthorities).toBeDefined();
        });

        it('must have an hasAuthority function', function() {
            expect(scope.hasAuthority).toBeDefined();
        });

        //TODO: restangular tests
    });
});
