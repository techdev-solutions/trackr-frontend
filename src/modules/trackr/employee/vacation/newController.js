define(['moment'], function(moment) {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.employee', function($scope, Restangular, EmployeeService) {
        var controller = this;
        $scope.vacationRequest = {};
        $scope.errors = [];

        controller.emitSavedVacationRequest = function(vacationRequest) {
            vacationRequest.startDate = moment(vacationRequest.startDate).format('YYYY-MM-DD');
            vacationRequest.endDate = moment(vacationRequest.endDate).format('YYYY-MM-DD');
            $scope.$emit('newVacationRequest', vacationRequest);
        };

        $scope.submitVacationRequest = function(vacationRequest) {
            vacationRequest.employee = EmployeeService.getEmployeeHref();
            vacationRequest.startDate = moment(vacationRequest.startDate).format('YYYY-MM-DD');
            vacationRequest.endDate = moment(vacationRequest.endDate).format('YYYY-MM-DD');
            Restangular.all('vacationRequests').post(vacationRequest).then(function(response) {
                controller.emitSavedVacationRequest(response);
                $scope.errors = [];
            }, function(response) {
                $scope.errors = response.data.errors;
            });
        };
    }];
});