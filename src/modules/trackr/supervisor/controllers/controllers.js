define(
    [
        'modules/trackr/supervisor/controllers/bill',
        'modules/trackr/supervisor/controllers/billCreate',
        'modules/trackr/supervisor/controllers/billReport'
    ],
    function(BillController, BillCreateController, BillReportController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('trackr.supervisor.controllers.bill', BillController);
                module.controller('trackr.supervisor.controllers.bill-create', BillCreateController);
                module.controller('trackr.supervisor.controllers.bill-report', BillReportController);
            }
        };
    }
);