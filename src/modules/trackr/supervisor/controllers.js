define(
    [
        'modules/trackr/supervisor/fileBillableHoursController',
        'modules/trackr/supervisor/fileBillableHoursSaveController',
        'modules/trackr/supervisor/billReportController',
        'modules/trackr/supervisor/vacation/vacationController',
        'modules/trackr/supervisor/expenses/listController',
        'modules/trackr/supervisor/expenses/editController'
    ],
    function(FileBillableHoursController, FileBillableHoursSaveController, BillReportController,
            VacationController, TravelExpenseReportListController, TravelExpenseReportEditController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('trackr.supervisor.controllers.file-billable-hours', FileBillableHoursController);
                module.controller('trackr.supervisor.controllers.save-billable-hours', FileBillableHoursSaveController);
                module.controller('trackr.supervisor.controllers.bill-report', BillReportController);
                module.controller('trackr.supervisor.controllers.vacation', VacationController);
                module.controller('trackr.supervisor.controllers.expenseReport-list', TravelExpenseReportListController);
                module.controller('trackr.supervisor.controllers.expenseReport-edit', TravelExpenseReportEditController);
            }
        };
    }
);