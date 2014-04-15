define(['baseTestSetup', 'fixtures'], function(baseTestSetup, fixtures) {
    'use strict';
    describe('trackr.employee.controllers.expense-edit', function() {
        var EditController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            scope.expense = fixtures['api/travelExpenses']._embedded.travelExpenses[0];
            EditController = $controller('trackr.employee.controllers.expense-edit', {
                $scope: scope
            });
        }));

        it('currently empty...', function() {
            /* TODO: somehow the $httpBackend.expectPATCH tests don't work in this controller, probably because of $watch */
        });
    });
});