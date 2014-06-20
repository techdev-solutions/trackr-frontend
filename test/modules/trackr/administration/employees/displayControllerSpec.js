define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.administration.controllers.employees.display', function () {
        var EditController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            EditController = $controller('trackr.administration.controllers.employees.display', {
                $scope: scope,
                $stateParams: {
                    id: 0
                }
            });
        }));

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('must have an employee in scope', function() {
            expect(scope.employee).toBeDefined();
        });

        it('must have the federal states in scope', function() {
            expect(scope.states).toBeDefined();
        });
    });
});