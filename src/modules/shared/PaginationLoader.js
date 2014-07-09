define(['lodash'], function(_) {
    'use strict';
    /**
     * A helper object that loads paginated objects and puts them into a scope.
     * @param base The Restangular base object obtained e.g. by 'Restangular.all("projects")'.
     * @param name The name that the objects fetched should have in the $scope.
     * @param sort The sorting parameter, e.g. 'name,asc'
     * @param $scope The $scope to put the fetched objects in.
     * @param [size] Size to load, standard 5.
     * @constructor
     */
    function PaginationLoader(base, name, sort, $scope, size) {
        var self = this;
        this.base = base;
        this.name = name;
        this.sort = sort;
        this.$scope = $scope;
        this.size = size || 5;
        this.afterObjectsGet = function(objects) {
            self.$scope[self.name] = objects;
        };
    }

    /**
     * Load the given page from the server and calls the afterObjectsGet method with it.
     * @param {Number} [page] The page to load, 1-based.
     * @param {Object} [otherQueryParams] Other params to be passed to Restangular.getList().
     * @param {*} [userData] Userdata passed to the afterObjectsGet method.
     * @param {String} [sort] Sort that should be used
     */
    PaginationLoader.prototype.loadPage = function(page, otherQueryParams, userData, sort) {
        page = page || 1;
        var self = this;
        if(sort) {
            this.sort = sort;
        }
        var parameters = {sort: this.sort, page: page - 1, size: this.size};
        if(otherQueryParams) {
            _.merge(parameters, otherQueryParams);
        }
        this.base.getList(parameters).then(function(objects) {
            self.afterObjectsGet(objects, userData);
        });
    };
    return PaginationLoader;
});