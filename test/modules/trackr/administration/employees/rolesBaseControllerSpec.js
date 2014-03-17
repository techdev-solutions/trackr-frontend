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

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('must have an updateCredentialAuthorities function', function() {
            expect(scope.updateCredentialAuthorities).toBeDefined();
        });

        it('must have an hasAuthority function', function() {
            expect(scope.hasAuthority).toBeDefined();
        });

        it('must have authorities in the scope', function() {
            expect(scope.authorities).toBeDefined();
            expect(scope.authorities.length).toBeGreaterThan(0);
        });
    });
});
