define([
    'modules/trackr/administration/controllers/employees/edit',
    'modules/trackr/administration/controllers/employees/new',
    'modules/trackr/administration/controllers/employees/list',
    'modules/trackr/administration/controllers/employees/rolesBase',
    'modules/trackr/administration/controllers/employees/rolesList',
    'modules/trackr/administration/controllers/companies/list',
    'modules/trackr/administration/controllers/companies/edit',
    'modules/trackr/administration/controllers/companies/new'
], function(EmployeeEditController, EmployeeNewController, EmployeeListController, RolesBaseController, RolesListController, CompaniesListController, CompaniesEditController, CompaniesNewController) {
    'use strict';
    return {
        init: function(module) {
            module.controller('trackr.administration.controllers.employees.edit', EmployeeEditController);
            module.controller('trackr.administration.controllers.employees.new', EmployeeNewController);
            module.controller('trackr.administration.controllers.employees.list', EmployeeListController);
            module.controller('trackr.administration.controllers.employees.roles-base', RolesBaseController);
            module.controller('trackr.administration.controllers.employees.roles-list', RolesListController);
            module.controller('trackr.administration.controllers.companies.list', CompaniesListController);
            module.controller('trackr.administration.controllers.companies.edit', CompaniesEditController);
            module.controller('trackr.administration.controllers.companies.new', CompaniesNewController);
        }
    };
});