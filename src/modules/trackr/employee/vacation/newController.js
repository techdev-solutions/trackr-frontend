define([], function() {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.employee', '$filter', function($scope, Restangular, EmployeeService, $filter) {
        var controller = this;
        $scope.vacationRequest = {};

        controller.emitSavedVacationRequest = function(vacationRequest) {
            vacationRequest.startDate = $filter('date')(new Date(vacationRequest.startDate), 'yyyy-MM-dd');
            vacationRequest.endDate = $filter('date')(new Date(vacationRequest.endDate), 'yyyy-MM-dd');
            $scope.$emit('newVacationRequest', vacationRequest);
        };

        $scope.submitVacationRequest = function(vacationRequest) {
            vacationRequest.employee = EmployeeService.getEmployeeHref();
            Restangular.all('vacationRequests').post(vacationRequest).then(function(response) {
                controller.emitSavedVacationRequest(response);
            });
        };
    }];
});