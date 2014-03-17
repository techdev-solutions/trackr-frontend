define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.supervisor.controllers.file-billable-hours', function() {
        var BillController, scope;

        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            BillController = $controller('trackr.supervisor.controllers.file-billable-hours', {
                $scope: scope
            });
        }));

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('must have a start date in scope', function() {
            expect(scope.start).toBeDefined();
        });

        it('must have an end date in scope', function() {
            expect(scope.end).toBeDefined();
        });

        it('must have a list of projects in scope', function() {
            expect(scope.projects).toBeDefined();
            expect(scope.projects.length).toBeGreaterThan(0);
        });

        it('load projects with getProjects', inject(function($httpBackend) {
            scope.getProjects('abc');
            $httpBackend.expectGET(/\/api\/projects\/search\/findByNameLikeOrIdentifierLikeOrderByNameAsc\?.*/);
            $httpBackend.flush();
        }));

        it('should switch the open date variables to true with openDate', function() {
            var event = {
                preventDefault: angular.noop,
                stopPropagation: angular.noop
            };
            spyOn(event, 'preventDefault').andCallThrough();
            spyOn(event, 'stopPropagation').andCallThrough();
            scope.openStart = false;
            scope.openDate(event, 'openStart');
            expect(scope.openStart).toBe(true);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(event.stopPropagation).toHaveBeenCalled();
        });

        it('should return a properly formatted project label with getProjectLabel', function() {
            var project = {
                name: 'Project',
                identifier: '100.1'
            };
            var label = scope.getProjectLabel(project);
            expect(label).toBe('Project (100.1)');
        });

        function expectWorkTimeLoad($httpBackend) {
            $httpBackend.expectGET(/\/api\/workTimes\/findEmployeeMappingByProjectAndDateBetween\?.*/);
            $httpBackend.flush();
            expect(scope.employeeMapping).toBeDefined();
            expect(scope.employeeMapping[1]).toBeDefined();
        }

        it('should load the mapping data from the server on call to loadWorktimes', inject(function($httpBackend) {
            scope.project = {
                id: 0
            };
            scope.loadWorktimes();
            expectWorkTimeLoad($httpBackend);
        }));

        it('should load the mapping data from the server on change of start', inject(function($httpBackend) {
            scope.project = {
                id: 0
            };
            scope.start = new Date();
            expectWorkTimeLoad($httpBackend);
        }));

        it('should load the mapping data from the server on change of start', inject(function($httpBackend) {
            scope.project = {
                id: 0
            };
            scope.end = new Date();
            expectWorkTimeLoad($httpBackend);
        }));
    });
});