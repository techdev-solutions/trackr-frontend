define(['modules/shared/PaginationLoader'], function(PaginationLoader) {
    'use strict';
    describe('shared.PaginationLoader', function() {
        var paginationLoader, restangularBase, scope;
        beforeEach(function() {
            restangularBase = {
                getList: function() {}
            };
            spyOn(restangularBase, 'getList').andReturn({
                then: function(callback) { callback([]); }
            });
            scope = {};
            paginationLoader = new PaginationLoader(restangularBase, 'name', 'sort', scope);
        });

        it('Must have all properties attached', function() {
            expect(paginationLoader.base).toBeDefined();
            expect(paginationLoader.name).toBe('name');
            expect(paginationLoader.sort).toBe('sort');
            expect(paginationLoader.$scope).toBeDefined();
            expect(paginationLoader.size).toBe(5);
        });

        it('Must call getList with page 0 if a new page is requested without parameter', function() {
            paginationLoader.loadPage();
            expect(restangularBase.getList).toHaveBeenCalledWith({sort: 'sort', page: 0, size: 5});
        });

        it('Must call getList with the correct page parameter if a new page is requested with parameter', function() {
            paginationLoader.loadPage(5);
            expect(restangularBase.getList).toHaveBeenCalledWith({sort: 'sort', page: 4, size: 5});
        });

        it('Must put the returned objects into the scope after a page has been requested', function() {
            paginationLoader.loadPage();
            expect(scope.name).toBeDefined();
        });
    });
});