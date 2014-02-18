define(['app', 'angular-mocks'], function() {
    'use strict';
    describe('trackr.administration.controllers.administration-roles', function () {
        var AdministrationRolesController, scope;

        beforeEach(module('app'));

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            AdministrationRolesController = $controller('trackr.administration.controllers.administration-roles', {
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
