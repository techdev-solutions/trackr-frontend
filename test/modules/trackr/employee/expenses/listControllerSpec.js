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
    });
});