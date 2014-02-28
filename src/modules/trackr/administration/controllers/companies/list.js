define([], function () {
    'use strict';
    return ['$scope', 'Restangular', '$modal', '$state', function($scope, Restangular, $modal, $state) {
        var allCompanies = Restangular.all('companies');

        //TODO: pagination
        function loadCompanies(page) {
            page = page || 1;
            allCompanies.getList({sort: 'name,asc', page: page - 1, size: 5}).then(function (companies) {
                $scope.companies = companies;
            });
        }

        $scope.setPage = function(page) {
            loadCompanies(page);
        };

        //initially load all companies
        loadCompanies();

        $scope.addNew = function() {
            var modalInstance = $modal.open({
                backdrop: 'static',
                templateUrl: '/src/modules/trackr/administration/partials/companies/new.tpl.html',
                controller: 'trackr.administration.controllers.companies.new'
            });
            modalInstance.result.then(function(company) {
                loadCompanies();
                $state.go('trackr.administration.companies.edit', {id: company.companyId});
            });
        };
    }];
});