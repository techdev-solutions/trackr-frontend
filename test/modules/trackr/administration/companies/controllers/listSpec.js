define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.administration.controllers.companies.list', function() {
        var ListController, scope;
        baseTestSetup();
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ListController = $controller('trackr.administration.controllers.companies.list', {
                $scope: scope
            });
        }));

        it('must load companies at the start', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.companies).toBeDefined();
            expect(scope.companies.length).toBeGreaterThan(0);
        }));
    });
});