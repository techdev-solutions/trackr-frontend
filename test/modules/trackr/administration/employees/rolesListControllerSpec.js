define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.administration.controllers.employees.roles-list', function () {
        var RolesListController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            RolesListController = $controller('trackr.administration.controllers.employees.roles-list', {
                $scope: scope
            });
        }));

        it('It must load all credentials with their authorities on load.', inject(function($httpBackend) {
            $httpBackend.expectGET(/api\/credentials\?projection=\w+/);
            $httpBackend.flush();
            expect(scope.credentials).toBeDefined();
        }));

    });
});
