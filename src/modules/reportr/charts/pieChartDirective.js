define(['chartjs', './colors'], function(Chart, colors) {
    'use strict';

    var legendTemplate = '<ul class="chart-legend">' +
        '<% for (var i=0; i<segments.length; i++){%>' +
        '   <li><span style="background-color:<%=segments[i].fillColor%>">&nbsp;</span><%if(segments[i].label){%><%=segments[i].label%><%}%></li>' +
        '<%}%></ul>';

    var options = {legendTemplate: legendTemplate};

    /**
     * Add color and highlight color to an array of data.
     * @param data {Array}
     * @returns {Array}
     */
    function addColorsToData(data) {
        var segmentColors = colors.getColorWithHighlight(data.length);

        return data.map(function(dataPoint, i) {
            return {
                value: dataPoint.value,
                color: segmentColors[i].color,
                highlight: segmentColors[i].highlight,
                label: dataPoint.label
            };
        });
    }

    return function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '='
            },
            template: '<div><canvas width="600" height="300"></canvas></div>',
            link: function(scope, element) {
                var pie;
                var context = element.children()[0].getContext('2d');

                scope.$watch('data', function(newData) {
                    if(pie) {
                        pie.destroy();
                        element.children('.chart-legend').remove();
                    }
                    if(!newData) {
                        return;
                    }

                    var pieChartData = addColorsToData(scope.data);
                    pie = new Chart(context).Pie(pieChartData, options);
                    element.append(pie.generateLegend());
                });

            }
        };
    };
});