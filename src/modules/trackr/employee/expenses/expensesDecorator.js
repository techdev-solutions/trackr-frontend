define([], function() {
    'use strict';

    /**
     * Add up the cost of all expenses.
     * @returns {Number}
     */
    function totalCost() {
        /*jshint validthis:true */
        return this.reduce(function(prev, expense) {
            return prev + parseFloat(expense.cost);
        }, 0);
    }

    /**
     * Add up the cost of all expenses that are not paid yet.
     * @returns {Number}
     */
    function totalReimbursement() {
        /*jshint validthis:true */
        return this.reduce(function(prev, expense) {
            return prev + (expense.paid ? 0 : parseFloat(expense.cost));
        }, 0);
    }

    /**
     * Decorate an expenses array with two methods to calculate the sum of costs and not-paid costs.
     */
    return function(expenses) {
        expenses.totalCost = totalCost;
        expenses.totalReimbursement = totalReimbursement;
    };
});