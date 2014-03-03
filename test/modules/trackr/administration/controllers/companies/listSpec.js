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

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('must load companies at the start', function() {
            expect(scope.companies).toBeDefined();
            expect(scope.companies.length).toBeGreaterThan(0);
        });
    });
});