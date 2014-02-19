define(['angular', 'modules/shared/directives/directives'], function(angular, directives) {
    'use strict';
    var configFn = [];
    var shared = angular.module('shared', configFn);
    directives.init(shared);
    return shared;
});