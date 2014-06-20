define([
    'modules/trackr/administration/employees/displayController',
    'modules/trackr/administration/employees/editController',
    'modules/trackr/administration/employees/newController',
    'modules/trackr/administration/employees/listController',
    'modules/trackr/administration/employees/rolesBaseController',
    'modules/trackr/administration/employees/rolesListController',
    'modules/trackr/administration/companies/listController',
    'modules/trackr/administration/companies/displayController',
    'modules/trackr/administration/companies/editController',
    'modules/trackr/administration/companies/newController',
    'modules/trackr/administration/companies/contactPersons/newOrEditController',
    'modules/trackr/administration/projects/listController',
    'modules/trackr/administration/projects/editController',
    'modules/trackr/administration/projects/newController'
], function(EmployeeDisplayController, EmployeeEditController, EmployeeNewController, EmployeeListController,
            RolesBaseController, RolesListController,
            CompaniesListController, CompaniesDisplayController, CompaniesEditController, CompaniesNewController,
            ContactPersonsNewOrEditController,
            ProjectsListController, ProjectsEditController, ProjectsNewController) {
    'use strict';
    return {
        init: function(module) {
            module.controller('trackr.administration.controllers.employees.display', EmployeeDisplayController);
            module.controller('trackr.administration.controllers.employees.edit', EmployeeEditController);
            module.controller('trackr.administration.controllers.employees.new', EmployeeNewController);
            module.controller('trackr.administration.controllers.employees.list', EmployeeListController);
            module.controller('trackr.administration.controllers.employees.roles-base', RolesBaseController);
            module.controller('trackr.administration.controllers.employees.roles-list', RolesListController);
            module.controller('trackr.administration.controllers.companies.list', CompaniesListController);
            module.controller('trackr.administration.controllers.companies.display', CompaniesDisplayController);
            module.controller('trackr.administration.controllers.companies.edit', CompaniesEditController);
            module.controller('trackr.administration.controllers.companies.new', CompaniesNewController);
            module.controller('trackr.administration.controllers.companies.contactPersons.new-or-edit', ContactPersonsNewOrEditController);
            module.controller('trackr.administration.controllers.projects.list', ProjectsListController);
            module.controller('trackr.administration.controllers.projects.edit', ProjectsEditController);
            module.controller('trackr.administration.controllers.projects.new', ProjectsNewController);
        }
    };
});