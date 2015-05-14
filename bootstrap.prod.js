require.config({
    paths: {
        'jQuery': 'src/vendor/jquery/dist/jquery.min',
        'twitter-bootstrap': 'src/vendor/bootstrap/dist/js/bootstrap.min',
        'angular': 'src/vendor/angular/angular.min',
        'angular-l10n-de': 'vendor/angular-i18n/angular-locale_de-de',
        'angular-ui-router': 'src/vendor/angular-ui-router/release/angular-ui-router.min',
        'restangular': 'src/vendor/restangular/dist/restangular.min',
        'lodash': 'src/vendor/lodash/dist/lodash.min',
        'angular-translate': 'src/vendor/angular-translate/angular-translate.min',
        'angular-translate-loader-url': 'src/vendor/angular-translate-loader-url/angular-translate-loader-url.min',
        'angular-ui': 'src/vendor/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min',
        'angular-charts': 'src/vendor/angular-charts/dist/angular-charts.min',
        'moment': 'src/vendor/moment/min/moment.min',
        'd3': 'src/vendor/d3/d3.min',
        'chartjs': 'vendor/chartjs/Chart.min',
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
        'angular-charts': { deps: ['angular', 'd3'] }
    }
});
require(['trackr']);