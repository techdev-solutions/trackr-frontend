define(
    [
        './fileBillableHoursController',
        './fileBillableHoursSaveController',
        './billReportController',
        './vacation/vacationController'
    ],
    function(FileBillableHoursController, FileBillableHoursSaveController, BillReportController,
            VacationController) {
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