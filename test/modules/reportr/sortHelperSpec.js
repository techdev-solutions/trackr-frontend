define(['modules/reportr/sortHelper'], function(SortHelper) {
    'use strict';
    describe('LodashHelpers', function() {

        it('sortArrayOfArrays with index as number', function() {
            var data = [ ['b', 1], ['a', 0] ];
            SortHelper.sortArrayOfArrays(data, '0', -1);
            expect(data[0][0]).toEqual('a');
        });

        it('sortArrayOfArrays ascending index 0', function() {
            var data = [ ['b', 1], ['A', 0] ];
            SortHelper.sortArrayOfArrays(data, 0, -1);
            expect(data[0][0]).toEqual('A');
        });

        it('sortArrayOfArrays descending index 0', function() {
            var data = [ ['A', 1], ['b', 0] ];
            SortHelper.sortArrayOfArrays(data, 0, 1);
            expect(data[0][0]).toEqual('b');
        });

        it('sortArrayOfArrays descending index 1', function() {
            var data = [ ['A', 0], ['b', 1] ];
            SortHelper.sortArrayOfArrays(data, 1, 1);
            expect(data[0][1]).toEqual(1);
        });

        it('sortArrayOfArrays ascending index 1', function() {
            var data = [ ['A', 1], ['b', 0] ];
            SortHelper.sortArrayOfArrays(data, 1, -1);
            expect(data[0][1]).toEqual(0);
        });
    });
});