define(['modules/trackr/services/employeeService'], function(EmployeeService) {
    'use strict';
    return {
        init: function(module) {
            module.service('trackr.services.employee', EmployeeService);
        }
    };
});