define(['chartjs', './colors'], function(Chart, colors) {
    'use strict';

    var legendTemplate = '<ul>' +
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

    /**
     * Directive to display a pie chart with a legend.
     *
     * Attributes:
     * data - data to be displayed. <ust be in the format for the chart.js pie chart directive: (see http://www.chartjs.org/docs/#doughnut-pie-chart-introduction)
     *  excluding the colors (so only value and label). The colors will be added randomly.
     * size - size in px, the pie chart will be a square. Optional, default is 300.
     */
    return function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '='
            },
            template: function(element, attributes) {
                var size = attributes.size || 300;
                return '<div class="piechart"><canvas width="'+size+'" height="'+size+'"></canvas><div style="left: '+size+'px" class="chart-legend"></div></div>';
            },
            link: function(scope, element) {
                var pie;
                var context = element.children('canvas')[0].getContext('2d');
                var legendDiv = element.children('.chart-legend');

                scope.$watch('data', function(newData) {
                    if(pie) {
                        pie.destroy();
                        legendDiv.children('ul').remove();
                    }
                    if(!newData) {
                        return;
                    }

                    var pieChartData = addColorsToData(scope.data);
                    pie = new Chart(context).Pie(pieChartData, options);
                    legendDiv.append(pie.generateLegend());
                });

            }
        };
    };
});