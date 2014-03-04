define(
    [
        'modules/trackr/employee/controllers/self',
        'modules/trackr/employee/controllers/timesheet',
        'modules/trackr/employee/controllers/timesheet-overview'
    ],
    function(SelfController, TimeSheetController, TimesheetOverviewController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('trackr.employee.controllers.self', SelfController);
                module.controller('trackr.employee.controllers.timesheet', TimeSheetController);
                module.controller('trackr.employee.controllers.timesheet-overview', TimesheetOverviewController);
            }
        };
    }
);