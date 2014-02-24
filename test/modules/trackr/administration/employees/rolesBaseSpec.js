define(['app', 'angular-mocks'], function() {
    'use strict';
    describe('trackr.administration.controllers.employees.roles-base', function () {
        var RolesBaseController, scope;

        beforeEach(module('app'));

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            RolesBaseController = $controller('trackr.administration.controllers.employees.roles-base', {
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
