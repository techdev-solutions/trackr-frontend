define(
    ['modules/trackr/employee/controllers/self'],
    function(SelfController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('trackr.employee.controllers.self', SelfController);
            }
        };
    }
);