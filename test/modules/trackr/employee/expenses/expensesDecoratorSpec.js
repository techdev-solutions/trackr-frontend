define(['modules/trackr/employee/expenses/expensesDecorator'], function(expensesDecorator) {
    'use strict';
    describe('The expenses decorator', function() {

        it('must add a totalCost function to the array that calculates the sum of costs', function() {
            var expenses = [{cost: 10}, {cost: 13}];
            expensesDecorator(expenses);
            expect(expenses.totalCost).toBeDefined();
            expect(expenses.totalCost()).toBe(23);
        });

        it('must add a totalReimbursement function to the array that calculates the sum of non-paid costs', function() {
            var expenses = [{cost: 10, paid: false}, {cost: 13, paid: true}];
            expensesDecorator(expenses);
            expect(expenses.totalReimbursement).toBeDefined();
            expect(expenses.totalReimbursement()).toBe(10);
        });
    });
});