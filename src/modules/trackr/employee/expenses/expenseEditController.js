define(['lodash'], function(_) {
    'use strict';
    /**
     * Controller to watch editing of some fields of a single expense in a report.
     */
    return ['createOrUpdateModal.userdata', '$scope', 'Restangular', '$filter', function(userdata, $scope, Restangular, $filter) {
        var controller = this;
        $scope.expense = _.clone(userdata.expense, false);
        $scope.expenseTypes = userdata.expenseTypes;

        controller.onFail = function(response) {
            $scope.errors = response.data.errors;
        };

        controller.saveExpense = function(expense) {
            var expenseEntity = _.pick(expense, ['id', 'version', 'type', 'fromDate', 'toDate', 'vat', 'cost']);
            Restangular.one('travelExpenses', expenseEntity.id).patch(expenseEntity)
                .then(function(result) {
                    $scope.closeModal(result);
                }, controller.onFail);
        };

        $scope.saveEntity = function() {
            controller.saveExpense($scope.expense);
        };

        /**
         * Translate the travel expense type from its enum value.
         * @param type The enum value (e.g. TAXI)
         * @returns {*} The translation (e.g. Taxi)
         */
        $scope.translateTravelExpenseType = function(type) {
            return $filter('translate')('TRAVEL_EXPENSE.TYPE_VALUES.' + type);
        };

        $scope.openDate = function($event, name) {
            $event.stopPropagation();
            $event.preventDefault();
            controller[name] = true;
        };

        $scope.dateOptions = {
            'year-format': '\'yyyy\'',
            'starting-day': 1
        };
    }];
});