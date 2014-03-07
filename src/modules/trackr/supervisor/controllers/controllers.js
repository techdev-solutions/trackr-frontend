define(
    [
        'modules/trackr/supervisor/controllers/bill',
        'modules/trackr/supervisor/controllers/billCreate'
    ],
    function(BillController, BillCreateController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('trackr.supervisor.controllers.bill', BillController);
                module.controller('trackr.supervisor.controllers.bill-create', BillCreateController);
            }
        };
    }
);