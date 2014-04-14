define(['modules/trackr/services/employeeService',
    'modules/trackr/services/travelExpenseReportService',
    'modules/trackr/services/travelExpenseService'], function(EmployeeService, TravelExpenseReportService, TravelExpenseService) {
    'use strict';
    return {
        init: function(module) {
            module.service('trackr.services.employee', EmployeeService);
            module.service('trackr.services.travelExpenseReport', TravelExpenseReportService);
            module.service('trackr.services.travelExpense', TravelExpenseService);
        }
    };
});