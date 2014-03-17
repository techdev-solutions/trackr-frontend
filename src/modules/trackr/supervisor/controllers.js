define(
    [
        'modules/trackr/supervisor/fileBillableHoursController',
        'modules/trackr/supervisor/fileBillableHoursSaveController',
        'modules/trackr/supervisor/billReportController'
    ],
    function(FileBillableHoursController, FileBillableHoursSaveController, BillReportController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('trackr.supervisor.controllers.file-billable-hours', FileBillableHoursController);
                module.controller('trackr.supervisor.controllers.save-billable-hours', FileBillableHoursSaveController);
                module.controller('trackr.supervisor.controllers.bill-report', BillReportController);
            }
        };
    }
);