define(['baseTestSetup', 'fixtures', 'angular'], function(baseTestSetup, fixtures, angular) {
    'use strict';
    describe('trackr.supervisor.controllers.expenseReport-edit', function() {
        var EditController, scope, state;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            var report = fixtures['api/travelExpenseReports']._embedded.travelExpenseReports[0];
            report.expenses = fixtures['api/travelExpenses']._embedded.travelExpenses;
            state = {
                go: angular.noop
            };
            EditController = $controller('trackr.supervisor.controllers.expenseReport-edit', {
                $scope: scope,
                expenses: report.expenses,
                report: report,
                $state: state
            });
        }));

        it('must calculcate the total cost of the report on load', function() {
            expect(scope.totalCost).toBeDefined();
        });

        it('must call approve on the server when approving', inject(function($httpBackend) {
            spyOn(state, 'go');
            scope.accept(scope.report);
            $httpBackend.expectPUT('api/travelExpenseReports/' + scope.report.id + '/approve');
            $httpBackend.flush();
            expect(state.go).toHaveBeenCalledWith('app.trackr.supervisor.expenses', null, {reload: true});
        }));

        it('must call reject on the server when rejecting', inject(function($httpBackend) {
            spyOn(state, 'go');
            scope.reject(scope.report);
            $httpBackend.expectPUT('api/travelExpenseReports/' + scope.report.id + '/reject');
            $httpBackend.flush();
            expect(state.go).toHaveBeenCalledWith('app.trackr.supervisor.expenses', null, {reload: true});
        }));
    });
});