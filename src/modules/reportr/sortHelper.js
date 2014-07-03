define(['lodash'], function(_) {
    'use strict';
    return {
        /**
         * Sort an array of the form
         * [
         *  ['string1', number1, number2, ...],
         *  ['string2', number3, number4, ...],
         *  ...
         * ]
         * by one of the indices of the child arrays. If the index is 0 the case is ignored.
         *
         * Uses JS sort and thus mutates the array
         * @param {Array} array The array of the special sort to sort
         * @param {String|Number} index The index to use for sorting
         * @param {Number} direction -1 descending, 1 ascending
         */
        sortArrayOfArrays: function(array, index, direction) {
            var before = _.identity;
            if(index === 0 || index === '0') {
                before = function(a) {
                    return a.toLowerCase();
                };
            }
            array.sort(function(a, b) {
                if(before(a[index]) < before(b[index])) {
                    return direction;
                } else if(before(a[index]) > before(b[index])) {
                    return direction*-1;
                }
                return 0;
            });
        }
    };
});