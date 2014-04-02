define(['lodash'], function(_) {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.employee', function($scope, Restangular, EmployeeService) {
        $scope.employee = EmployeeService.getEmployee();

        Restangular.allUrl('vacationRequests', 'api/vacationRequests/search/findByEmployeeOrderByStartDateAsc')
            .getList({employee: $scope.employee.id}).then(function(vacationRequests) {
                $scope.vacationRequests = vacationRequests;
            });

        $scope.$on('newVacationRequest', function(event, data) {
            $scope.vacationRequests.push(data);
        });

        $scope.cancelVacationRequest = function(vacationRequest) {
            vacationRequest.remove().then(function() {
                _.remove($scope.vacationRequests, function(vR) {
                    return vR.id === vacationRequest.id;
                });
            }, function() {
                //error
            });
        };
    }];
});