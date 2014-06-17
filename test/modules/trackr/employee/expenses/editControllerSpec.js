define(['baseTestSetup', 'fixtures', 'confirmationServiceMock'], function(baseTestSetup, fixtures, ConfirmationServiceMock) {
    'use strict';
    describe('trackr.employee.controllers.expenseReport-edit', function() {
        var EditController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            EditController = $controller('trackr.employee.controllers.expenseReport-edit', {
                $scope: scope,
                expenseTypes: fixtures['api/travelExpenses/types'],
                $stateParams: { id: 0 },
                'base.services.confirmation-dialog': ConfirmationServiceMock
            });
        }));

        it('must calculcate the total cost of the report on load', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.totalCost).toBeDefined();
        }));

        it('editable must return true if status is PENDING', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.editable({status: 'PENDING'})).toBe(true);
        }));

        it('editable must return true if status is REJECTED', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.editable({status: 'REJECTED'})).toBe(true);
        }));

        it('editable must return false if status is APPROVED', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.editable({status: 'APPROVED'})).toBe(false);
        }));

        it('editable must return false if status is SUBMITTED', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.editable({status: 'SUBMITTED'})).toBe(false);
        }));

        it('must call a DELETE when an expense is removed and update the expenses and totalCost', inject(function($httpBackend) {
            $httpBackend.flush();
            var expensesBefore = scope.report.expenses.length;
            var totalCostBefore = scope.totalCost;
            scope.removeExpense(scope.report.expenses[0]);
            $httpBackend.expectDELETE('api/travelExpenses/' + scope.report.expenses[0].id);
            $httpBackend.flush();
            expect(scope.report.expenses.length).toBe(expensesBefore - 1);
            expect(scope.totalCost).toBeLessThan(totalCostBefore);
        }));

        it('must recalculate the total cost when the costEdited callback is called', inject(function($httpBackend) {
            $httpBackend.flush();
            spyOn(EditController, 'recalculateTotal');
            scope.costEdited();
            expect(EditController.recalculateTotal).toHaveBeenCalled();
        }));

        it('must POST a new expense to the server on addNewExpense, set the report and submissionDate property on it', inject(function($httpBackend) {
            $httpBackend.flush();
            var expense = {cost: 1};
            var countExpenses = scope.report.expenses.length;
            var oldTotalCost = scope.totalCost;
            scope.addNewExpense(expense, scope.report);
            $httpBackend.expectPOST('api/travelExpenses');
            $httpBackend.flush();
            expect(expense.report).toBeDefined();
            expect(expense.submissionDate).toBeDefined();
            expect(scope.report.expenses.length).toBe(countExpenses + 1);
            expect(scope.totalCost).toBeGreaterThan(oldTotalCost);
        }));

        it('must call submit on the server when submitting', inject(function($httpBackend) {
            $httpBackend.flush();
            scope.submitReport(scope.report);
            $httpBackend.expectPUT('api/travelExpenseReports/' + scope.report.id + '/submit');
            $httpBackend.flush();
        }));
    });
});