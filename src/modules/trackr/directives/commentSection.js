define([], function() {
    'use strict';
    /**
     * Comment section, currently only used for travel expense reports.
     * Comments are expected to have the fields submissionDate, employee and text.
     * <p>
     * Attributes:
     * * comments: {Array} A reference to the comments array
     * * preprocessor: {Function} A function that is called on a new comment before it is POSTed. Users can add new fields to it. Not optional!
     * * url: {String} A string that is the entity Restangular should use to POST, e.g. 'travelExpenseReportComments'
     */
    return [function() {
        return {
            restrict: 'E',
            templateUrl: 'src/modules/trackr/directives/commentSection.tpl.html',
            scope: {comments: '=', preprocessor: '=', url: '@'},
            controller: ['$scope', 'Restangular', 'trackr.services.employee', function($scope, Restangular, EmployeeService) {
                var controller = this;

                $scope.comment = {};
                $scope.errors = {};

                controller.addComment = function(comment, employee, url) {
                    comment.employee = employee._links.self.href;
                    comment.submissionDate = new Date();
                    return Restangular.all(url).post(comment);
                };

                $scope.addComment = function() {
                    var _comment = $scope.preprocessor($scope.comment);
                    controller.addComment(_comment, EmployeeService.getEmployee(), $scope.url)
                        .then(function(comment) {
                            // The REST service does not return the employee but it is needed for display.
                            comment.employee = EmployeeService.getEmployee();
                            $scope.comments.push(comment);
                            $scope.comment = {};
                        });
                };
            }]
        };
    }];
});