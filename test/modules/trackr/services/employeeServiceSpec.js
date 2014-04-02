define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.services.employee', function() {
        var EmployeeService;
        baseTestSetup();
        beforeEach(inject(function($injector) {
            EmployeeService = $injector.get('trackr.services.employee');
        }));

        it('loadEmployee must load the employee from the backend', inject(function($httpBackend) {
            EmployeeService.loadEmployee();
            $httpBackend.expectGET(/^api\/employees\/\d+/);
            $httpBackend.flush();
        }));

        it('getEmployee must return an employee after loadEmployee was called', inject(function($httpBackend) {
            EmployeeService.loadEmployee();
            $httpBackend.flush();
            var employee = EmployeeService.getEmployee();
            expect(employee).toBeDefined();
        }));

        it('getEmployeeHref must return a HREF after loadEmployee was called', inject(function($httpBackend) {
            EmployeeService.loadEmployee();
            $httpBackend.flush();
            var employeeHref = EmployeeService.getEmployeeHref();
            expect(employeeHref).toBeDefined();
            expect(employeeHref).not.toBe('');
        }));
    });
});