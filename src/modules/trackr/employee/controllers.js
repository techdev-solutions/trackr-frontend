define(
    [
        'modules/trackr/employee/selfController',
        'modules/trackr/employee/timesheet/timesheetController',
        'modules/trackr/employee/timesheet/timesheetOverviewController',
        'modules/trackr/employee/vacation/listController',
        'modules/trackr/employee/vacation/newController',
        'modules/trackr/employee/expenses/listController',
        'modules/trackr/employee/expenses/editController'
    ],
    function(SelfController, TimeSheetController, TimesheetOverviewController, VacationListController, VacationNewController, ExpensesListController, ExpensesEditController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('trackr.employee.controllers.self', SelfController);
                module.controller('trackr.employee.controllers.timesheet', TimeSheetController);
                module.controller('trackr.employee.controllers.timesheet-overview', TimesheetOverviewController);
                module.controller('trackr.employee.controllers.vacation-list', VacationListController);
                module.controller('trackr.employee.controllers.vacation-new', VacationNewController);
                module.controller('trackr.employee.controllers.expenses-list', ExpensesListController);
                module.controller('trackr.employee.controllers.expenses-edit', ExpensesEditController);
            }
        };
    }
);