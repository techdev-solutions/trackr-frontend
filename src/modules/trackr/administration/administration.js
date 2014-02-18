define(['angular', 'modules/trackr/administration/controllers/controllers'], function(angular, controllers) {
    'use strict';
    var administration = angular.module('trackr.administration', []);

    administration.config(['$stateProvider', function($stateProvider) {
        $stateProvider
        .state('trackr.administration', {
            url: '/administration',
            views: {
                'center@': {
                    templateUrl: 'src/modules/trackr/administration/partials/administration.tpl.html'
                }
            }
        })
        .state('trackr.administrationPages', {
            url: '/administration/{page:[\\w]+}',
            views: {
                'center@': {
                    templateUrl: function(stateParams) {
                        return 'src/modules/trackr/administration/partials/administration-' + stateParams.page + '.tpl.html';
                    },
                    controllerProvider: ['$stateParams', function($stateParams) {
                        return 'trackr.administration.controllers.administration-' + $stateParams.page;
                    }]
                }
            }
        });
    }]);

    controllers.init(administration);
    return administration;
});