require.config({
    baseUrl: 'src',
    paths: {
        'jQuery': 'vendor/jquery/dist/jquery',
        'twitter-bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
        'angular': 'vendor/angular/angular',
        'angular-l10n-de': 'vendor/angular-i18n/angular-locale_de-de',
        'angular-ui-router': 'vendor/angular-ui-router/release/angular-ui-router',
        'restangular': 'vendor/restangular/dist/restangular',
        'lodash': 'vendor/lodash/dist/lodash',
        'angular-translate': 'vendor/angular-translate/angular-translate',
        'angular-translate-loader-url': 'vendor/angular-translate-loader-url/angular-translate-loader-url',
        'angular-ui': 'vendor/angular-ui-bootstrap-bower/ui-bootstrap-tpls',
        'angular-charts': 'vendor/angular-charts/dist/angular-charts',
        'moment': 'vendor/moment/moment',
        'd3': 'vendor/d3/d3',
        'chartjs': 'vendor/chartjs/Chart',
        'randomColor': 'vendor/randomColor/randomColor'
    },
    shim: {
        'angular': { exports: 'angular', deps: ['jQuery'] },
        'angular-l10n-de': { deps: ['angular'] },
        'angular-ui-router': { deps: ['angular']},
        'jQuery': { exports: '$' },
        'twitter-bootstrap': { deps: ['jQuery'] },
        'restangular': { deps: ['angular', 'lodash']},
        'lodash': { exports: '_'},
        'angular-translate': { deps: ['angular'] },
        'angular-translate-loader-url': { deps: ['angular-translate'] },
        'angular-ui': { deps: ['angular'] },
        'angular-charts': { deps: ['d3', 'angular'] },
        'd3': { exports: 'd3' }
    }
});

var dependencies = ['angular', 'app', 'angular-l10n-de'];
require(dependencies, function(angular) {
    'use strict';
    angular.bootstrap(document, ['app']);
});
