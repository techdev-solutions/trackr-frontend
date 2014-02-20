define([], function() {
    'use strict';
    return ['$stateParams', '$scope', 'Restangular', function($stateParams, $scope, Restangular) {
        Restangular.allUrl('companies', '/api/companies/search/findByCompanyId').getList({companyId: $stateParams.id}).then(function(companies) {
            //todo: why does spring return an array? the method signature is a single entity
            $scope.company = companies[0];
        });
    }];
});