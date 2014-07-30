define(['baseTestSetup', 'fixtures', 'angular'], function(baseTestSetup, fixtures, angular) {
    'use strict';
    describe('trackr.employee.controllers.expenseReport-list', function() {
        var ListController, scope, state;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            var employee = {
                _links: { self: {href: ''}}
            };
            state = {
                go: angular.noop
            };
            var reports = fixtures['api/travelExpenseReports']._embedded.travelExpenseReports;
            ListController = $controller('trackr.employee.controllers.expenseReport-list', {
                $scope: scope,
                reports: reports,
                $state: state,
                employee: employee
            });
        }));

        it('must add a new report on addNew and transition to its edit state', inject(function($httpBackend) {
            $httpBackend.flush();
            spyOn(state, 'go');
            scope.addNew();
            $httpBackend.expectPOST('api/travelExpenseReports');
            $httpBackend.flush();
            expect(state.go).toHaveBeenCalledWith('app.trackr.employee.expenses.edit', { id : undefined });
        }));
    });
});