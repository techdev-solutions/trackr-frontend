define(['angular', './pieChartDirective'], function(angular, pieChartDirective) {
    'use strict';
    var charts = angular.module('charts', []);
    charts.directive('pieChart', pieChartDirective);
    return charts;
});