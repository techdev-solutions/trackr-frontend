define([
    'angular',
    'modules/base/controllers/controllers',
    'modules/base/services/services',
    'modules/base/directives/directives',
    'i18n'
], function(angular, controllers, services, directives, i18n) {
    'use strict';
    var base = angular.module('base', []);
    controllers.init(base);
    services.init(base);
    directives.init(base);

    base.config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('authorize', {
                url: '/authorize',
                views: {
                    root: {
                        templateUrl: 'src/modules/base/partials/authorization.tpl.html',
                        controller: 'base.controllers.authorization'
                    }
                }
            })
            .state('app', {
                url: '/',
                views: {
                    root: {
                        templateUrl: 'src/modules/base/partials/app.tpl.html'
                    },
                    'center@app': {
                        templateUrl: 'src/modules/base/partials/modules.tpl.html'
                    }
                },
                /*
                Careful: For some reason this resolve does *not* get resolved before child states when doing a full page refresh.
                So if a state 'app.xy' needs the user to be set in the user service it should have a resolve itself that depends on the user!
                state('app.xy', {
                  resolve: ['user', function(user) {...}]
                })
                 */
                resolve: {
                    /**
                     * Load the principal object from the api and save it. Also enable the state authorization afterwards.
                     */
                    'app.user': ['$rootScope', '$log', 'base.services.user', '$http', '$state', function($rootScope, $log, UserService, $http, $state) {
                        //Try to load the user. If the user cannot be loaded
                        return $http.get('api/principal').then(function(response) {
                            var user = response.data;
                            UserService.setUser(user);
                            enableStateAuthorization($rootScope, $log, UserService);
                            return user;
                        }, function(response) {
                            if(response.status === 401 || response.status === 403) {
                                $log.info('User is not authorized to load principal. Switching to authorize state.');
                                $state.go('authorize');
                            } else {
                                $log.error('Loading the user from the backend failed. TODO: general error page.');
                            }
                        });
                    }],
                    'app.i18n': ['$translate', 'app.user', function($translate, user) {
                        i18n.setLanguageForUser($translate, user);
                    }]
                }
            });
    }]);

    /**
     * Enables the authorization to switch states according to granted authorities.
     * @param $rootScope The $rootScope, needed to listen on the stateChangeStart event.
     * @param $log The angular log service
     * @param UserService The UserService that contains the user.
     */
    function enableStateAuthorization($rootScope, $log, UserService) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if(toState.needsAuthority) {
                var user = UserService.getUser();
                $log.debug('User ' + user.email + ' tries to access state ' + toState.name + ' that needs the role ' + toState.needsAuthority);
                if(!UserService.userHasAuthority(toState.needsAuthority)) {
                    $log.debug('User ' + user.email + ' was denied access to state ' + toState.name);
                    event.preventDefault();
                } else {
                    $log.debug('User ' + user.email + ' was granted access to state ' + toState.name);
                }
            }
        });
    }

    return base;
});