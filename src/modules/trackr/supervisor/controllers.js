define(
    [
        'modules/trackr/supervisor/fileBillableHoursController',
        'modules/trackr/supervisor/fileBillableHoursSaveController',
        'modules/trackr/supervisor/billReportController',
        'modules/trackr/supervisor/vacation/vacationController'
    ],
    function(FileBillableHoursController, FileBillableHoursSaveController, BillReportController, VacationController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('trackr.supervisor.controllers.file-billable-hours', FileBillableHoursController);
                module.controller('trackr.supervisor.controllers.save-billable-hours', FileBillableHoursSaveController);
                module.controller('trackr.supervisor.controllers.bill-report', BillReportController);
                module.controller('trackr.supervisor.controllers.vacation', VacationController);
            }
        };
    }
);