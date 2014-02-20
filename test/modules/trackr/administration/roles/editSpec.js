define(['app', 'angular-mocks'], function() {
    'use strict';
    describe('trackr.administration.controllers.roles.edit', function () {
        var AdministrationRolesController, scope;

        beforeEach(module('app'));

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            AdministrationRolesController = $controller('trackr.administration.controllers.roles.edit', {
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
