define([], function() {
    'use strict';
    return ['base.services.user', 'Restangular', function(UserService, Restangular) {
        var employee;
        return {
            loadEmployee: function () {
                return Restangular.one('employees', UserService.getUser().id).get().then(function(_employee) {
                    employee = _employee;
                    return employee;
                });
            },
            getEmployee: function() {
                return employee;
            },
            getEmployeeHref: function() {
                return employee._links.self.href;
            }
        };
    }];
});