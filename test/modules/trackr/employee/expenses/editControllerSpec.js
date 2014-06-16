define(['baseTestSetup', 'fixtures', 'confirmationServiceMock'], function(baseTestSetup, fixtures, ConfirmationServiceMock) {
    'use strict';
    describe('trackr.employee.controllers.expenseReport-edit', function() {
        var EditController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            var report = fixtures['api/travelExpenseReports']._embedded.travelExpenseReports[0];
            report.expenses = fixtures['api/travelExpenses']._embedded.travelExpenses;
            EditController = $controller('trackr.employee.controllers.expenseReport-edit', {
                $scope: scope,
                expenses: report.expenses,
                report: report,
                expenseTypes: fixtures['api/travelExpenses/types'],
                'base.services.confirmation-dialog': ConfirmationServiceMock
            });
        }));

        it('must calculcate the total cost of the report on load', function() {
            expect(scope.totalCost).toBeDefined();
        });

        it('editable must return true if status is PENDING', function() {
            expect(scope.editable({status: 'PENDING'})).toBe(true);
        });

        it('editable must return true if status is REJECTED', function() {
            expect(scope.editable({status: 'REJECTED'})).toBe(true);
        });

        it('editable must return false if status is APPROVED', function() {
            expect(scope.editable({status: 'APPROVED'})).toBe(false);
        });

        it('editable must return false if status is SUBMITTED', function() {
            expect(scope.editable({status: 'SUBMITTED'})).toBe(false);
        });

        it('must call a DELETE when an expense is removed and update the expenses and totalCost', inject(function($httpBackend) {
            var expensesBefore = scope.report.expenses.length;
            var totalCostBefore = scope.totalCost;
            scope.removeExpense(scope.report.expenses[0]);
            $httpBackend.expectDELETE('api/travelExpenses/' + scope.report.expenses[0].id);
            $httpBackend.flush();
            expect(scope.report.expenses.length).toBe(expensesBefore - 1);
            expect(scope.totalCost).toBeLessThan(totalCostBefore);
        }));

        it('must recalculate the total cost when the costEdited callback is called', function() {
            spyOn(EditController, 'recalculateTotal');
            scope.costEdited();
            expect(EditController.recalculateTotal).toHaveBeenCalled();
        });

        it('must POST a new expense to the server on addNewExpense, set the report and submissionDate property on it', inject(function($httpBackend) {
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
            scope.submitReport(scope.report);
            $httpBackend.expectPUT('api/travelExpenseReports/' + scope.report.id + '/submit');
            $httpBackend.flush();
        }));
    });
});