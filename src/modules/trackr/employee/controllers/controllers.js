define(
    [
        'modules/trackr/employee/controllers/self',
        'modules/trackr/employee/controllers/timesheet'
    ],
    function(SelfController, TimeSheetController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('trackr.employee.controllers.self', SelfController);
                module.controller('trackr.employee.controllers.timesheet', TimeSheetController);
            }
        };
    }
);