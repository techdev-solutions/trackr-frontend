define(['modules/shared/PaginationLoader'], function(PaginationLoader) {
    'use strict';
    return ['$scope', 'Restangular', '$modal', '$state', function($scope, Restangular, $modal, $state) {
        var paginationLoader = new PaginationLoader(Restangular.all('companies'), 'companies', 'name,asc', $scope, 5);

        $scope.setPage = function(page) {
            paginationLoader.loadPage(page);
        };

        //initially load all companies
        paginationLoader.loadPage();

        $scope.addNew = function() {
            var modalInstance = $modal.open({
                backdrop: 'static',
                templateUrl: 'src/modules/trackr/administration/companies/new.tpl.html',
                controller: 'trackr.administration.controllers.companies.new'
            });
            modalInstance.result.then(function(company) {
                paginationLoader.loadPage();
                $state.go('trackr.administration.companies.edit', {id: company.companyId});
            });
            return modalInstance;
        };
    }];
});