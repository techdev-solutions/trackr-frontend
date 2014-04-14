define([], function() {
    'use strict';
    /**
     * Controller to watch editing of some fields of a single expense in a report.
     */
    return ['$scope', 'Restangular', function($scope, Restangular) {
        function patch(patchObj) {
            Restangular.oneUrl('travelExpenses/' + $scope.expense.id).patch(patchObj).then(function() {
                $scope.errors = [];
            }, function(response) {
                $scope.errors = response.data.errors;
            });
        }

        function watch(field) {
            $scope.$watch('expense.' + field, function(newVal, oldVal) {
                if(oldVal && oldVal !== newVal) {
                    var patchObj = {};
                    patchObj[field] = newVal;
                    patch(patchObj);
                }
            });
        }

        watch('type');
        watch('fromDate');
        watch('toDate');
    }];
});