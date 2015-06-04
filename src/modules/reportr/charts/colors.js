define(['randomColor'], function(randomColor) {
    'use strict';

    function increaseBrightness(hex, percent) {
        // strip the leading # if it's there
        hex = hex.replace(/^\s*#|\s*$/g, '');

        var r = parseInt(hex.substr(0, 2), 16),
            g = parseInt(hex.substr(2, 2), 16),
            b = parseInt(hex.substr(4, 2), 16);

        return '#' +
            ((0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
            ((0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
            ((0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
    }

    function getColorsWithHighlight(count) {
        return randomColor({count: count})
            .map(function(hex) {
                return {
                    color: hex,
                    highlight: increaseBrightness(hex, 20)
                };
            });
    }

    return {
        getColorWithHighlight: getColorsWithHighlight
    };
});