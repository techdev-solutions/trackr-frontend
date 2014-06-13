define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.supervisor.controllers.bill-report', function() {
        var BillReportController, scope;

        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            BillReportController = $controller('trackr.supervisor.controllers.bill-report', {
                $scope: scope
            });
        }));

        it('getCompanies must search for companies in the backend', inject(function($httpBackend) {
            scope.getCompanies('test');
            $httpBackend.expectGET(/^api\/companies\/search\/findByNameLikeIgnoreCaseOrderByNameAsc\?.*/);
            $httpBackend.flush();
        }));

        it('loadProjects must search for companies in the backend', inject(function($httpBackend) {
            var company;
            scope.getCompanies('test').then(function(companies) {
                company = companies[0];
            });
            $httpBackend.flush();
            scope.loadProjects(company);
            $httpBackend.expectGET(/^api\/companies\/\d+\/projects/);
            $httpBackend.flush();
            expect(scope.projects).toBeDefined();
        }));

        it('loadProjectData must load BillData', inject(function($httpBackend) {
            scope.project = {
                _links: { debitor: { href: 'api/companies/0' } }
            };
            scope.loadProjectData();
            $httpBackend.expectGET(/^api\/billableTimes\/findEmployeeMappingByProjectAndDateBetween\?.*/);
            $httpBackend.flush();
        }));
    });
});