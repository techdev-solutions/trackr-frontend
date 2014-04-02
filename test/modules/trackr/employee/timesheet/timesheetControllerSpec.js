define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.employee.timesheetController', function() {
        var TimesheetController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            var EmployeeService = {
                getEmployeeHref: function() {
                    return '';
                }
            };
            TimesheetController = $controller('trackr.employee.controllers.timesheet', {
                $scope: scope,
                'trackr.services.employee': EmployeeService
            });
        }));

        it('It must have the start and end date, an errors array and the current date in the scope.', function() {
            expect(scope.startTime).toBeDefined();
            expect(scope.endTime).toBeDefined();
            expect(scope.date).toBeDefined();
            expect(scope.errors).toBeDefined();
        });

        it('getProjects must search for projects in the backend', inject(function($httpBackend) {
            scope.getProjects('test');
            $httpBackend.expectGET(/api\/projects\/search\/findByNameLikeOrIdentifierLikeOrderByNameAsc\?.*/);
            $httpBackend.flush();
        }));

        it('formatTime must format a date correctly', function() {
            var time = TimesheetController.formatTime(new Date());
            expect(time).toMatch(/\d{2}:\d{2}:\d{2}/);
        });

        it('Must create a new worktime entity', function() {
            scope.project = {
                _links: { self: { href: '' } }
            };
            var entity = TimesheetController.createWorkTimeEntity();
            expect(entity).toBeDefined();
        });

        it('Must save the worktime entity to the backend', inject(function($httpBackend) {
            scope.saveTime();
            $httpBackend.expectPOST('api/workTimes');
            $httpBackend.flush();
        }));
    });
});