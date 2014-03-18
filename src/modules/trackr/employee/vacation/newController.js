define([], function() {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.employee', '$filter', function($scope, Restangular, EmployeeService, $filter) {
        var controller = this;
        $scope.vacationRequest = {};

        controller.formatDate = function(date) {
            return $filter('date')(date, 'yyyy-MM-dd');
        };

        controller.emitSavedVacationRequest = function(vacationRequest) {
            vacationRequest.startDate = controller.formatDate(new Date(vacationRequest.startDate));
            vacationRequest.endDate = controller.formatDate(new Date(vacationRequest.endDate));
            $scope.$emit('newVacationRequest', vacationRequest);
        };

        $scope.submitVacationRequest = function(vacationRequest) {
            vacationRequest.employee = EmployeeService.getEmployeeHref();
            vacationRequest.startDate = controller.formatDate(vacationRequest.startDate);
            vacationRequest.endDate = controller.formatDate(vacationRequest.endDate);
            Restangular.all('vacationRequests').post(vacationRequest).then(function(response) {
                controller.emitSavedVacationRequest(response);
            });
        };
    }];
});