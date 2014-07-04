define(['modules/shared/PaginationLoader'], function(PaginationLoader) {
    'use strict';
    return ['Restangular', '$scope', function(Restangular, $scope) {
        var paginationLoader = new PaginationLoader(Restangular.all('address_book'), 'employees', '', $scope, 20);

        $scope.setPage = function() {
            paginationLoader.loadPage($scope.employees.page.number);
        };

        //initially load all companies
        paginationLoader.loadPage();
    }];
});