define(['angular', 'modules/shared/directives/directives', 'modules/shared/controllers/createOrUpdateModalController',
        'modules/shared/services/createOrUpdateModalService'],
    function(angular, directives, createOrUpdateModalController, createOrUpdateModalService) {
        'use strict';
        var configFn = [];
        var shared = angular.module('shared', configFn);
        directives.init(shared);
        shared.controller('shared.controllers.create-or-update-modal',createOrUpdateModalController);
        shared.service('shared.services.create-or-update-modal', createOrUpdateModalService);
        return shared;
    });