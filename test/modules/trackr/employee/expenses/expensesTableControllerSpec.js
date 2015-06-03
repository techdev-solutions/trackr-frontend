define(['baseTestSetup', 'confirmationServiceMock'], function(baseTestSetup, ConfirmationServiceMock) {
    'use strict';
    describe('trackr.employee.expenses.expenseTableController', function() {
        var expenseTableController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            expenseTableController = $controller('trackr.employee.expenses.expenseTableController', {
                $scope: scope,
                'base.services.confirmation-dialog': ConfirmationServiceMock
            });
        }));

        it('must call DELETE when removing an expense', inject(function($httpBackend) {
            scope.expenses = [{id: 0}, {id: 1}];
            scope.removeExpense(scope.expenses[1]);
            $httpBackend.expectDELETE('api/travelExpenses/' + scope.expenses[1].id);
            $httpBackend.flush();
            expect(scope.expenses.length).toBe(1);
        }));
    });
});