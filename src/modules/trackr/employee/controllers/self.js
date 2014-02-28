define([], function() {
    'use strict';
    return ['$scope', 'base.services.user', 'Restangular', function($scope, UserService, Restangular) {
        var user = UserService.getUser();
        Restangular.one('employees', user.id).get().then(function(employee) {
            $scope.employee = employee;
        });

        $scope.updateEmployee = function(patch) {
            return Restangular.oneUrl('employees', '/api/employees/' + user.id + '/self').patch(patch);
        };
    }];
});