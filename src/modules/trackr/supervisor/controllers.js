define(
    [
        'modules/trackr/supervisor/billController',
        'modules/trackr/supervisor/billCreateController',
        'modules/trackr/supervisor/billReportController'
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