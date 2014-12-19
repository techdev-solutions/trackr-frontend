define(['lodash'], function(_) {
    'use strict';
    return ['$scope', 'Restangular', '$http', 'base.services.user', 'base.services.confirmation-dialog',
        function($scope, Restangular, $http, UserService, ConfirmationService) {
            var controller = this;
            var findRequestsByStatusBase = Restangular.allUrl('vacationRequests', 'api/vacationRequests/search/findByStatusOrderBySubmissionTimeAsc');

            /**
             * Load vacation requests with a specific status.
             * @param type pending, approved or rejected
             */
            controller.loadRequests = function(type) {
                findRequestsByStatusBase.getList({
                    status: type.toUpperCase(),
                    projection: 'withEmployeeAndApprover'
                }).then(function(requests) {
                    $scope[type + 'Requests'] = requests;
                });
            };

            controller.loadRequests('pending');
            controller.loadRequests('approved');
            controller.loadRequests('rejected');
            $scope.principal = UserService.getUser();

            /**
             * Execute an action on a vacation request.
             * @param vacationRequest
             * @param type The action to execute, either 'approve' or 'reject'.
             * @param resultArray The array in which the vacation request should be pushed when the action is successful.
             */
            function actionOnRequest(vacationRequest, type, resultArray) {
                $http.put('api/vacationRequests/' + vacationRequest.id + '/' + type).then(function(response) {
                    _.remove($scope.pendingRequests, {id: vacationRequest.id});
                    vacationRequest.approver = response.data.approver;
                    vacationRequest.approvalDate = response.data.approvalDate;
                    vacationRequest.status = response.data.status;
                    resultArray.push(vacationRequest);
                });
            }

            $scope.approve = function(vacationRequest) {
                actionOnRequest(vacationRequest, 'approve', $scope.approvedRequests);
            };

            $scope.reject = function(vacationRequest) {
                actionOnRequest(vacationRequest, 'reject', $scope.rejectedRequests);
            };

            controller.remove = function(vacationRequest) {
                vacationRequest.remove()
                    .then(function() {
                        _.remove($scope[vacationRequest.status.toLowerCase() + 'Requests'], {id: vacationRequest.id});
                    });
            };

            $scope.confirmDelete = function(vacationRequest) {
                ConfirmationService.openConfirmationDialog('PAGES.SUPERVISOR.VACATION.REALLY_DELETE').
                    result.then(controller.remove.bind(controller, vacationRequest));
            };
        }];
});