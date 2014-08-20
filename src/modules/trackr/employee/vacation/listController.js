define(['lodash'], function(_) {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.employee', 'base.services.confirmation-dialog',
        function($scope, Restangular, EmployeeService, ConfirmationDialogService) {
            $scope.employee = EmployeeService.getEmployee();

            Restangular.allUrl('vacationRequests', 'api/vacationRequests/search/findByEmployeeOrderByStartDateAsc')
                .getList({
                    employee: $scope.employee.id,
                    projection: 'withEmployeeAndApprover'
                }).then(function(vacationRequests) {
                    $scope.vacationRequests = vacationRequests;
                });

            /*
             This will be fired by the vacation-new controller.
             */
            $scope.$on('newVacationRequest', function(event, data) {
                $scope.vacationRequests.push(data);
            });

            $scope.cancelVacationRequest = function(vacationRequest) {
                function deleteVacationRequest() {
                    vacationRequest.remove().then(function() {
                        _.remove($scope.vacationRequests, {id: vacationRequest.id});
                    });
                }

                ConfirmationDialogService.openConfirmationDialog('ACTIONS.REALLY_DELETE').result.then(deleteVacationRequest);
            };
        }];
});