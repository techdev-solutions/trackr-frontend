define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.administration.controllers.employees.roles-base', function () {
        var RolesBaseController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            RolesBaseController = $controller('trackr.administration.controllers.employees.roles-base', {
                $scope: scope
            });
        }));

        it('must have an updateCredentialAuthorities function', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.updateCredentialAuthorities).toBeDefined();
        }));

        it('must have an hasAuthority function', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.hasAuthority).toBeDefined();
        }));

        it('must have authorities in the scope', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.authorities).toBeDefined();
            expect(scope.authorities.length).toBeGreaterThan(0);
        }));
    });
});
