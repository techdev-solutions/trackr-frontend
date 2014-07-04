define(['modules/reportr/lodashHelpers'], function(LodashHelpers) {
    'use strict';
    describe('LodashHelpers', function() {

        it('mapAndReduceValuesToSum with function key/number extractor', function() {
            var data = [ { prop1: 'one', prop2: 'two', number: 3}];
            var mappers = {
                keyMapper: function(d) {
                    return d.prop1 + d.prop2;
                },
                numberMapper: function(d) {
                    return d.number * 3;
                }
            };
            spyOn(mappers, 'keyMapper').andCallThrough();
            spyOn(mappers, 'numberMapper').andCallThrough();

            var result = LodashHelpers.mapAndReduceValuesToSum(data, mappers.keyMapper, mappers.numberMapper);
            expect(mappers.keyMapper).toHaveBeenCalled();
            expect(mappers.numberMapper).toHaveBeenCalled();
            expect(result.length).toEqual(1);
            expect(result[0][0]).toEqual('onetwo');
            expect(result[0][1]).toEqual(9);
        });

        it('mapAndReduceValuesToSum with string key/number mapper', function() {
            var data = [ { prop1: 'one', number: 3}];
            var result = LodashHelpers.mapAndReduceValuesToSum(data, 'prop1', 'number');
            expect(result.length).toEqual(1);
            expect(result[0][0]).toEqual('one');
            expect(result[0][1]).toEqual(3);
        });
    });
});