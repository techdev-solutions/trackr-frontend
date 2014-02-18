define([
    'modules/trackr/administration/controllers/administration-roles',
    'modules/trackr/administration/controllers/administration-companies'
], function(RolesAdministrationController, CompaniesAdministrationController) {
    'use strict';
    return {
        init: function(module) {
            module.controller('trackr.administration.controllers.administration-roles', RolesAdministrationController);
            module.controller('trackr.administration.controllers.administration-companies', CompaniesAdministrationController);
        }
    };
});