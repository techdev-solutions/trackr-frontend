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

        it('must calculate the total cost of expenses', function() {
            scope.expenses = [{cost: 10}, {cost: 13}];
            var totalCost = scope.totalCost();
            expect(totalCost).toBe(23);
        });

        it('must calculate the total reimbursement of expenses', function() {
            scope.expenses = [{cost: 10, paid: true}, {cost: 13, paid: false}];
            var totalReimbursement = scope.totalReimbursement();
            expect(totalReimbursement).toBe(13);
        });

        it('must call DELETE when removing an expense', inject(function($httpBackend) {
            scope.expenses = [{id: 0}, {id: 1}];
            scope.removeExpense(scope.expenses[1]);
            $httpBackend.expectDELETE('api/travelExpenses/' + scope.expenses[1].id);
            $httpBackend.flush();
            expect(scope.expenses.length).toBe(1);
        }));
    });
});