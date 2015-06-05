define([], function() {
    'use strict';
    var expensesTableDirective = function() {
        return {
            restrict: 'E',
            scope: {
                expenses: '=',
                editable: '='
            },
            templateUrl: 'src/modules/trackr/employee/expenses/expensesTable.tpl.html',
            controller: 'trackr.employee.expenses.expenseTableController'
        };
    };
    return expensesTableDirective;
});