define(['lodash'], function(_) {
    'use strict';
    return {
        /**
         * Maps all values in array with mapper and reduces the mapped values to a sum with numberExtractor.
         *
         * The map is turned into an array of pairs for the return value since this is the format that is desired for reportr (it is sortable which
         * a map is not).
         *
         * Example:
         * Input: [ { name: 'name1', number: 1 }, { name: 'name1', number: 2 }, { name: 'name2', number: 1 } ]
         * with the obvious mappings
         * Output: [ ['name1', 3], ['name2', 1] ]
         * @param {Array} array The values to map
         * @param {Function|String} mapper A function from an array element to a value object like string, int etc or the name of a property to use.
         * @param {Function|String} numberExtractor A function from an array element to a number or the name of a property of an value that is a number.
         * @return {Array} An array consisting of 'pairs' (arrays of length 2), The first element is the groupBy key, the second element the sum of numbers.
         */
        mapAndReduceValuesToSum: function(array, mapper, numberExtractor) {
            var _numberExtractor = numberExtractor;
            if (_.isString(numberExtractor)) {
                _numberExtractor = function(val) {
                    return val[numberExtractor];
                };
            }
            return _.pairs(_.mapValues(
                _.groupBy(array, mapper),
                function(values) {
                    return _.reduce(values, function(sum, val) {
                        return sum + _numberExtractor(val);
                    }, 0);
                }
            ));
        }
    };
});