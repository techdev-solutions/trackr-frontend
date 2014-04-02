define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.supervisor.controllers.vacation', function() {
        var VacationController, scope, vacationRequest;

        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            VacationController = $controller('trackr.supervisor.controllers.vacation', {
                $scope: scope
            });
            vacationRequest = {
                id: 0
            };
        }));

        it('loads all request on load', inject(function($httpBackend) {
            $httpBackend.expectGET('api/vacationRequests/search/findByStatusOrderBySubmissionTimeAsc?status=PENDING');
            $httpBackend.expectGET('api/vacationRequests/search/findByStatusOrderBySubmissionTimeAsc?status=APPROVED');
            $httpBackend.expectGET('api/vacationRequests/search/findByStatusOrderBySubmissionTimeAsc?status=REJECTED');
            $httpBackend.flush();
            expect(scope.pendingRequests).toBeDefined();
            expect(scope.approvedRequests).toBeDefined();
            expect(scope.rejectedRequests).toBeDefined();
        }));

        it('approve approves requests', inject(function($httpBackend) {
            $httpBackend.flush();
            var pendingLength = scope.pendingRequests.length;
            var approvedLength = scope.approvedRequests.length;
            scope.approve(vacationRequest);
            $httpBackend.flush();
            expect(scope.pendingRequests.length).toBe(pendingLength - 1);
            expect(scope.approvedRequests.length).toBe(approvedLength + 1);
        }));

        it('reject rejects requests', inject(function($httpBackend) {
            $httpBackend.flush();
            var pendingLength = scope.pendingRequests.length;
            var rejectedLength = scope.rejectedRequests.length;
            scope.reject(vacationRequest);
            $httpBackend.flush();
            expect(scope.pendingRequests.length).toBe(pendingLength - 1);
            expect(scope.rejectedRequests.length).toBe(rejectedLength + 1);
        }));
    });
});