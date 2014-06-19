define(['modules/shared/PaginationLoader'], function(PaginationLoader) {
    'use strict';
    return ['$scope', 'Restangular', '$state', 'shared.services.create-or-update-modal', function($scope, Restangular, $state, createOrUpdateModalService) {
        var paginationLoader = new PaginationLoader(Restangular.all('companies'), 'companies', 'name,asc', $scope, 5);

        $scope.setPage = function() {
            paginationLoader.loadPage($scope.companies.page.number);
        };

        //initially load all companies
        paginationLoader.loadPage();

        $scope.addNew = function() {
            var modalInstance = createOrUpdateModalService
                .showModal('trackr.administration.controllers.companies.new', 'src/modules/trackr/administration/companies/newOrEdit.tpl.html', 'COMPANY.CREATE_NEW');
            modalInstance.result.then(function(company) {
                paginationLoader.loadPage();
                $state.go('trackr.administration.companies.edit', {id: company.companyId});
            });
            return modalInstance;
        };
    }];
});