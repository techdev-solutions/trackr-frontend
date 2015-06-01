define(['baseTestSetup', 'fixtures'], function(baseTestSetup, fixtures) {
    'use strict';
    describe('trackr.employee.expenses.expenseReportEditController', function() {
        var EditController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            EditController = $controller('trackr.employee.expenses.expenseReportEditController', {
                $scope: scope,
                expenseTypes: fixtures['api/travelExpenses/types'],
                $stateParams: { id: 0 }
            });
        }));

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

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

        it('deletable must return true if the status is PENDING', function() {
            expect(scope.deletable({status: 'PENDING'})).toBe(true);
        });

        it('deletable must return true if the status is REJECTED', function() {
            expect(scope.deletable({status: 'REJECTED'})).toBe(true);
        });

        it('deletable must return false if the status is SUBMITTED', function() {
            expect(scope.deletable({status: 'SUBMITTED'})).toBe(false);
        });

        it('must call submit on the server when submitting', inject(function($httpBackend) {
            scope.submitReport(scope.report);
            $httpBackend.expectPUT('api/travelExpenseReports/' + scope.report.id + '/submit');
            $httpBackend.flush();
        }));

        it('must push an expense signalled with an event into the reports expense array', function() {
            var numberOfExpensesBefore = scope.report.expenses.length;
            scope.$emit('newExpense', {});
            expect(scope.report.expenses.length).toBe(numberOfExpensesBefore + 1);
        });
    });
});