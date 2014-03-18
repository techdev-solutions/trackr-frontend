define(
    [
        'modules/trackr/employee/selfController',
        'modules/trackr/employee/timesheet/timesheetController',
        'modules/trackr/employee/timesheet/timesheetOverviewController',
        'modules/trackr/employee/vacation/listController',
        'modules/trackr/employee/vacation/newController'
    ],
    function(SelfController, TimeSheetController, TimesheetOverviewController, VacationListController, VacationNewController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('trackr.employee.controllers.self', SelfController);
                module.controller('trackr.employee.controllers.timesheet', TimeSheetController);
                module.controller('trackr.employee.controllers.timesheet-overview', TimesheetOverviewController);
                module.controller('trackr.employee.controllers.vacation-list', VacationListController);
                module.controller('trackr.employee.controllers.vacation-new', VacationNewController);
            }
        };
    }
);