define(['angular', './pieChartDirective', './barChartDirective'], function(angular, pieChartDirective, barChartDirective) {
    'use strict';
    var charts = angular.module('charts', []);
    charts.directive('pieChart', pieChartDirective);
    charts.directive('barChart', barChartDirective);
    return charts;
});