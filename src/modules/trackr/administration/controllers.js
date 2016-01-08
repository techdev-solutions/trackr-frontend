define([
    'modules/trackr/administration/companies/listController',
    'modules/trackr/administration/companies/displayController',
    'modules/trackr/administration/companies/editController',
    'modules/trackr/administration/companies/newController',
    'modules/trackr/administration/companies/contactPersons/newOrEditController',
    'modules/trackr/administration/projects/listController',
    'modules/trackr/administration/projects/editController',
    'modules/trackr/administration/projects/displayController',
    'modules/trackr/administration/projects/newController'
], function(CompaniesListController, CompaniesDisplayController, CompaniesEditController, CompaniesNewController,
            ContactPersonsNewOrEditController,
            ProjectsListController, ProjectsEditController, ProjectsDisplayController, ProjectsNewController) {
    'use strict';
    return {
        init: function(module) {
            module.controller('trackr.administration.controllers.companies.list', CompaniesListController);
            module.controller('trackr.administration.controllers.companies.display', CompaniesDisplayController);
            module.controller('trackr.administration.controllers.companies.edit', CompaniesEditController);
            module.controller('trackr.administration.controllers.companies.new', CompaniesNewController);
            module.controller('trackr.administration.controllers.companies.contactPersons.new-or-edit', ContactPersonsNewOrEditController);
            module.controller('trackr.administration.controllers.projects.list', ProjectsListController);
            module.controller('trackr.administration.controllers.projects.edit', ProjectsEditController);
            module.controller('trackr.administration.controllers.projects.display', ProjectsDisplayController);
            module.controller('trackr.administration.controllers.projects.new', ProjectsNewController);
        }
    };
});