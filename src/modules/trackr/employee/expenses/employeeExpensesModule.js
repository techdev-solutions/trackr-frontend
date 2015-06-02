define(['angular', './listController', './editController', './expenseEditController', './expenseNewController',
        './reportNewController', './expensesTableDirective', './expensesTableController'],
    function(angular, ListController, EditController, ExpenseEditController, ExpenseNewController, ReportNewController,
        ExpensesTableDirective, ExpensesTableController) {
        'use strict';
        function config($stateProvider) {
            $stateProvider
                .state('app.trackr.employee.expenses', {
                    url: '/expenses',
                    breadcrumbTranslateCode: 'PAGES.EMPLOYEE.EXPENSES.TITLE',
                    views: {
                        'center@app': {
                            templateUrl: 'src/modules/trackr/employee/expenses/list.tpl.html',
                            controller: 'trackr.employee.expenses.expenseReportListController'
                        }
                    }
                })
                .state('app.trackr.employee.expenses.edit', {
                    url: '/{id:\\d+}',
                    breadcrumbTranslateCode: 'ACTIONS.EDIT',
                    resolve: {
                        expenseTypes: ['trackr.services.travelExpense', function(TravelExpenseService) {
                            return TravelExpenseService.loadTypes();
                        }]
                    },
                    views: {
                        'center@app': {
                            templateUrl: 'src/modules/trackr/employee/expenses/edit.tpl.html',
                            controller: 'trackr.employee.expenses.expenseReportEditController'
                        }
                    }
                });
        }
        config.$inject = ['$stateProvider'];

        var module = angular.module('trackr.employee.expenses', [], config);
        module.controller('trackr.employee.expenses.expenseReportListController', ListController);
        module.controller('trackr.employee.expenses.expenseReportEditController', EditController);
        module.controller('trackr.employee.expenses.expenseEditController', ExpenseEditController);
        module.controller('trackr.employee.expenses.expenseNewController', ExpenseNewController);
        module.controller('trackr.employee.expenses.expenseReportNewController', ReportNewController);

        module.directive('employeeExpensesTable', ExpensesTableDirective);
        module.controller('trackr.employee.expenses.expenseTableController', ExpensesTableController);
        return module;
    });