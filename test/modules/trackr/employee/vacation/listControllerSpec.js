define(['baseTestSetup', 'confirmationServiceMock'], function(baseTestSetup, ConfirmationServiceMock) {
    'use strict';
    describe('trackr.employee.controllers.vacation-list', function() {
        var EmployeeService, VacationRequestListController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            EmployeeService = {
                getEmployee: function() {
                    return {
                        id: 0
                    };
                }
            };
            spyOn(EmployeeService, 'getEmployee').andCallThrough();
            VacationRequestListController = $controller('trackr.employee.controllers.vacation-list', {
                $scope: scope,
                'trackr.services.employee': EmployeeService,
                'base.services.confirmation-dialog': ConfirmationServiceMock
            });
        }));

        it('Must get the employee on load', inject(function($httpBackend) {
            expect(EmployeeService.getEmployee).toHaveBeenCalled();
            $httpBackend.flush();
        }));

        it('Must load the vacation requests', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.vacationRequests).toBeDefined();
            expect(scope.vacationRequests.length).toBeGreaterThan(0);
        }));

        it('Must push a vacation request into the array on $scope event', inject(function($httpBackend) {
            $httpBackend.flush();
            var length = scope.vacationRequests.length;
            scope.$emit('newVacationRequest', {});
            expect(scope.vacationRequests.length).toBe(length + 1);
        }));

        it('Must remove a vacation request from the array if it is cancelled', inject(function($httpBackend) {
            $httpBackend.flush();
            var length = scope.vacationRequests.length;
            scope.cancelVacationRequest(scope.vacationRequests[0]);
            $httpBackend.flush();
            expect(scope.vacationRequests.length).toBe(length - 1);
        }));
    });
});