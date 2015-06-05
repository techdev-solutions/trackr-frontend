define(['modules/reportr/charts/colors'], function(colors) {
    'use strict';
    describe('reports.charts.colors', function() {

        it('generates the requested amount of colors', function() {
            var generatedColors = colors.getColorWithHighlight(1);
            expect(generatedColors.length).toBe(1);
        });

        it('generates both color and highlight', function() {
            var generatedColors = colors.getColorWithHighlight(1);
            expect(generatedColors[0].color).toBeDefined();
            expect(generatedColors[0].highlight).toBeDefined();
        });

        it('generates strings that start with #', function() {
            var generatedColors = colors.getColorWithHighlight(1);
            expect(generatedColors[0].color[0]).toBe('#');
            expect(generatedColors[0].highlight[0]).toBe('#');
        });
    });
});