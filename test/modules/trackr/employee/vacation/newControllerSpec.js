define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.employee.controllers.vacation-new', function() {
        var EmployeeService, VacationNewController, scope, vacationRequest;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            EmployeeService = {
                getEmployeeHref: function() {
                    return '';
                }
            };
            VacationNewController = $controller('trackr.employee.controllers.vacation-new', {
                $scope: scope,
                'trackr.services.employee': EmployeeService
            });
            vacationRequest = {
                startDate: new Date(),
                endDate: new Date()
            };
        }));

        it('It must have a vacation request blueprint', function() {
            expect(scope.vacationRequest).toBeDefined();
        });

        it('It must have an error array', function() {
            expect(scope.errors).toBeDefined();
        });

        it('Emit new vacation request must emit a new vacation request', function() {
            var emitted = false;
            scope.$on('newVacationRequest', function() {
                emitted = true;
            });
            VacationNewController.emitSavedVacationRequest(vacationRequest);
            expect(emitted).toBe(true);
        });

        it('Must load the vacation requests', inject(function($httpBackend) {
            scope.submitVacationRequest(vacationRequest);
            $httpBackend.expectPOST('api/vacationRequests');
            $httpBackend.flush();
        }));
    });
});