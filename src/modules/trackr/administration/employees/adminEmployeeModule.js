define(['angular', './editController', './listController', './newController', './displayController', './addressEditController'],
    function(angular, EditController, ListController, NewController, DisplayController, AddressEditController) {
        'use strict';
        function config($stateProvider) {
            $stateProvider
                .state('app.trackr.administration.employees.edit', {
                    url: '/{id:[\\d]+}',
                    views: {
                        'employee': {
                            templateUrl: 'src/modules/trackr/administration/employees/display.tpl.html',
                            controller: 'trackr.administration.employees.displayController'
                        }
                    },
                    needsAuthority: 'ROLE_SUPERVISOR'
                })
                .state('app.trackr.administration.employees', {
                    url: '/employees',
                    breadcrumbTranslateCode: 'EMPLOYEE.EMPLOYEES',
                    views: {
                        'center@app': {
                            templateUrl: 'src/modules/trackr/administration/employees/list.tpl.html',
                            controller: 'trackr.administration.employees.listController'
                        }
                    },
                    needsAuthority: 'ROLE_SUPERVISOR'
                });
        }

        config.$inject = ['$stateProvider'];
        var module = angular.module('trackr.administration.employees', [], config);

        module.controller('trackr.administration.employees.displayController', DisplayController);
        module.controller('trackr.administration.employees.editController', EditController);
        module.controller('trackr.administration.employees.addressEditController', AddressEditController);
        module.controller('trackr.administration.employees.newController', NewController);
        module.controller('trackr.administration.employees.listController', ListController);
        return module;
    });