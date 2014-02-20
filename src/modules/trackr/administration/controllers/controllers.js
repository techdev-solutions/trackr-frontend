define([
    'modules/trackr/administration/controllers/roles/edit',
    'modules/trackr/administration/controllers/companies/list',
    'modules/trackr/administration/controllers/companies/edit',
    'modules/trackr/administration/controllers/companies/new'
], function(RoleEditController, CompaniesListController, CompaniesEditController, CompaniesNewController) {
    'use strict';
    return {
        init: function(module) {
            module.controller('trackr.administration.controllers.roles.edit', RoleEditController);
            module.controller('trackr.administration.controllers.companies.list', CompaniesListController);
            module.controller('trackr.administration.controllers.companies.edit', CompaniesEditController);
            module.controller('trackr.administration.controllers.companies.new', CompaniesNewController);
        }
    };
});