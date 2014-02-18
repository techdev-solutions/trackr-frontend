require.config({
    baseUrl: 'src',
    paths: {
        'jQuery': 'bower_components/jquery/dist/jquery',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
        'angular': 'bower_components/angular/angular',
        'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
        'restangular':'bower_components/restangular/dist/restangular',
        'lodash': 'bower_components/lodash/dist/lodash'
    },
    shim: {
        'angular': { exports: 'angular' },
        'angular-ui-router': { deps: ['angular']},
        'jQuery': { exports: '$' },
        'bootstrap': { deps: ['jQuery'] },
        'restangular': { deps: ['angular', 'lodash']},
        'lodash' : { exports: '_'}
    }
});

var dependencies = ['require', 'app'];
require(dependencies, function() {

});
