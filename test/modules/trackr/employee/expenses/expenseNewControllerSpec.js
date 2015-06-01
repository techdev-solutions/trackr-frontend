define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.employee.expenses.expenseNewController', function() {
        var NewController, scope;
        baseTestSetup();
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            NewController = $controller('trackr.employee.expenses.expenseNewController', {
                $scope: scope
            });
        }));

        it('must POST a new expense to the server on addNewExpense, set the report and submissionDate property on it', inject(function($httpBackend) {
            scope.expense = {cost: 1};
            var report = {
                _links: {self: {href: 'report/1'}}
            };
            scope.addNewExpense(report);
            $httpBackend.expectPOST('api/travelExpenses');
            expect(scope.expense.report).toBe('report/1');
            expect(scope.expense.submissionDate).toBeDefined();
            $httpBackend.flush();
        }));
    });
});