define(['chartjs', './colors'], function(Chart, colors) {
    'use strict';

    var legendTemplate = '<ul>' +
        '<% for (var i=0; i<datasets.length; i++){%>' +
            '<li><span style="background-color:<%=datasets[i].fillColor%>">&nbsp;</span>' +
            '<%if(datasets[i].label){%><%=datasets[i].label%><%}%></li>' +
        '<%}%></ul>';

    var options = { legendTemplate: legendTemplate };

    function addColorsToData(data) {
        var _colors = colors.getColorWithHighlight(data.datasets.length);
        var dataSetsWithColors = data.datasets.map(function(dataset, i) {
            return {
                label: dataset.label,
                fillColor: _colors[i].color,
                strokeColor: '#FFF',
                highlightFill: _colors[i].highlight,
                highlightStroke: '#FFF',
                data: dataset.data
            };
        });

        return {
            labels: data.labels,
            datasets: dataSetsWithColors
        };
    }

    /**
     * Directive to display a bar chart with a legend.
     *
     * Attributes:
     * data - The data to be displayed in the format for a chart.js bar chart (see http://www.chartjs.org/docs/#bar-chart-example-usage).
     *   Colors are chosen randomly.
     * width - optional, the width in px. Default is 800.
     * heigth - optional, the height in px. Default is 400.
     */
    return function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '='
            },
            template: function(element, attributes) {
                var width = attributes.width || 800;
                var height = attributes.height || 400;
                return '<div><canvas width="'+width+'" height="'+height+'"></canvas><div style="left: '+width+'px" class="chart-legend"></div></div>';
            },
            link: function(scope, element) {
                var barChart;
                var context = element.children()[0].getContext('2d');
                var legendDiv = element.children('.chart-legend');

                scope.$watch('data', function(newData) {
                    if(barChart) {
                        barChart.destroy();
                        legendDiv.children('ul').remove();
                    }
                    if(!newData) {
                        return;
                    }

                    var barChartData = addColorsToData(scope.data);
                    barChart = new Chart(context).Bar(barChartData, options);
                    legendDiv.append(barChart.generateLegend());
                });
            }
        };
    };
});