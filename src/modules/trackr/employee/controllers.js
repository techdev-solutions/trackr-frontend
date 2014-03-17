define(
    [
        'modules/trackr/employee/selfController',
        'modules/trackr/employee/timesheet/timesheetController',
        'modules/trackr/employee/timesheet/timesheetOverviewController'
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