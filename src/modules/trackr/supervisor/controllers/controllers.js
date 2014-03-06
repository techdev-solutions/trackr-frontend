define(
    [
        'modules/trackr/supervisor/controllers/bill'
    ],
    function(BillController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('trackr.supervisor.controllers.bill', BillController);
            }
        };
    }
);