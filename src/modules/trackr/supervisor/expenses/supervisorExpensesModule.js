define(['angular', './editController', './listController'], function(angular, EditController, ListController) {
    'use strict';
    function config($stateProvider) {
        $stateProvider
            .state('app.trackr.supervisor.expenses', {
                url: '/expenses',
                breadcrumbTranslateCode: 'PAGES.SUPERVISOR.TRAVEL_EXPENSE_REPORTS.TITLE',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/supervisor/expenses/list.tpl.html',
                        controller: 'trackr.supervisor.expenses.ListController'
                    }
                }
            })
            .state('app.trackr.supervisor.expenses.edit', {
                url: '/{id:\\d+}',
                breadcrumbTranslateCode: 'ACTIONS.EDIT',
                views: {
                    'center@app': {
                        templateUrl: 'src/modules/trackr/supervisor/expenses/edit.tpl.html',
                        controller: 'trackr.supervisor.expenses.EditController'
                    }
                }
            });
    }

    config.$inject = ['$stateProvider'];
    var module = angular.module('trackr.supervisor.expenses', [], config);
    module.controller('trackr.supervisor.expenses.ListController', ListController);
    module.controller('trackr.supervisor.expenses.EditController', EditController);
    return module;
});