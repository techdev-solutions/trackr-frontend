define(['chartjs', './colors'], function(Chart, colors) {
    'use strict';

    var legendTemplate = '<ul class="chart-legend">' +
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

    return function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '='
            },
            template: '<div><canvas width="800" height="400"></canvas></div>',
            link: function(scope, element) {
                var barChart;
                var context = element.children()[0].getContext('2d');

                scope.$watch('data', function(newData) {
                    if(barChart) {
                        barChart.destroy();
                        element.children('.chart-legend').remove();
                    }
                    if(!newData) {
                        return;
                    }

                    var barChartData = addColorsToData(scope.data);
                    barChart = new Chart(context).Bar(barChartData, options);
                    element.append(barChart.generateLegend());
                });
            }
        };
    };
});