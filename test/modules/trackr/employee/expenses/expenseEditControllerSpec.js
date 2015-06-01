define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.employee.expenses.expenseEditController', function() {
        var EditController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            EditController = $controller('trackr.employee.expenses.expenseEditController', {
                $scope: scope,
                'createOrUpdateModal.userdata': {
                    expense: {},
                    expenseTypes: []
                }
            });
        }));

        it('Must put the expense in the scope', function() {
            expect(scope.expense).toBeDefined();
        });

        it('Must put the expense types in the scope', function() {
            expect(scope.expenseTypes).toBeDefined();
        });
    });
});