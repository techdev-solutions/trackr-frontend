define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.employee.expenses.expenseReportNewController', function() {
        var NewController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            scope.closeModal = angular.noop;
            NewController = $controller('trackr.employee.expenses.expenseReportNewController', {
                $scope: scope,
                'trackr.services.employee': {
                    getEmployeeHref: function() {
                        return {
                            _links: {self: {href:'employee/1'}}
                        };
                    }
                }
            });
        }));

        it('must load all projects for the company', inject(function($httpBackend, $q) {
            var company = {
                all: function() {
                    return {
                        getList: function() {
                            return $q.when([{id: 0}]);
                        }
                    };
                }
            };
            scope.loadProjects(company);
            scope.$digest();
            expect(scope.projects).toBeDefined();
            expect(scope.projects.length).toBe(1);
        }));

        it('POSTs a new report when saving', inject(function($httpBackend) {
            scope.saveEntity();
            $httpBackend.expectPOST('api/travelExpenseReports');
            $httpBackend.flush();
        }));

        it('adds the company to the report if it is set', inject(function($httpBackend) {
            NewController.company = {_links: {self: {href: 'companies/1'}}};
            scope.saveEntity();
            expect(scope.report.debitor).toBe('companies/1');
            $httpBackend.flush();
        }));

        it('adds the project to the report if it is set', inject(function($httpBackend) {
            NewController.project = {_links: {self: {href: 'projects/1'}}};
            scope.saveEntity();
            expect(scope.report.project).toBe('projects/1');
            $httpBackend.flush();
        }));
    });
});