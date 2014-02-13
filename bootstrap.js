require.config({
    baseUrl: 'src',
    paths: {
        'jQuery': 'bower_components/jquery/jquery',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
        'angular': 'bower_components/angular/angular',
        'angular-route': 'bower_components/angular-route/angular-route'
    },
    shim: {
        'angular': { exports: 'angular' },
        'angular-route': { deps: ['angular']},
        'jQuery': { exports: '$' },
        'bootstrap': { deps: ['jQuery'] }
    }
});

var dependencies = ['require', 'app'];
require(dependencies, function() {

});
