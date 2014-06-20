define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.administration.controllers.employees.list', function() {
        var ListController, scope, state;
        baseTestSetup();
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            state = {
                go: angular.noop
            };
            spyOn(state, 'go');
            ListController = $controller('trackr.administration.controllers.employees.list', {
                $scope: scope,
                $state: state
            });
        }));

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('must load companies at the start', function() {
            expect(scope.employees).toBeDefined();
            expect(scope.employees.length).toBeGreaterThan(0);
        });
    });
});