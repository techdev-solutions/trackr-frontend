define([], function() {
    'use strict';
    /**
     * A helper object that loads paginated objects and puts them into a scope.
     * @param base The Restangular base object obtained e.g. by 'Restangular.all("projects")'.
     * @param name The name that the objects fetched should have in the $scope.
     * @param sort The sorting parameter, e.g. 'name,asc'
     * @param $scope The $scope to put the fetched objects in.
     * @param size (Optional) Size to load, standard 5.
     * @constructor
     */
    function PaginationLoader(base, name, sort, $scope, size) {
        this.base = base;
        this.name = name;
        this.sort = sort;
        this.$scope = $scope;
        this.size = size || 5;
    }

    /**
     * Load the given page from the server and put the fetched objects in the scope.
     * @param page (Optional) The page to load, 1-based.
     */
    PaginationLoader.prototype.loadPage = function(page) {
        page = page || 1;
        var myThis = this;
        this.base.getList({sort: this.sort, page: page - 1, size: this.size}).then(function(objects) {
            myThis.$scope[myThis.name] = objects;
        });
    };
    return PaginationLoader;
});