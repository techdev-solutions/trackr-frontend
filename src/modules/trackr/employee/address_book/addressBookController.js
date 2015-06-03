define(['modules/shared/PaginationLoader'], function(PaginationLoader) {
    'use strict';
    return ['Restangular', '$scope', function(Restangular, $scope) {
        var paginationLoader = new PaginationLoader(Restangular.all('address_book'), 'employees', 'lastName,asc', $scope, 10);

        $scope.setPage = function() {
            paginationLoader.loadPage($scope.employees.page.number);
        };

        $scope.sortBy = function(property, direction) {
            var directionText = 'desc';
            if(direction == -1) {
                directionText = 'asc';
            }
            paginationLoader.loadPage($scope.employees.page.number, null, null, property + ',' + directionText);
        };

        //initially load all companies
        paginationLoader.loadPage();
    }];
});