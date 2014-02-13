define(['angular', 'modules/trackr/pages/controllers/controllers'], function(angular, controllers) {
    'use strict';
    var pages = angular.module('trackr.pages', []);

    controllers.init(pages);
    return pages;
});