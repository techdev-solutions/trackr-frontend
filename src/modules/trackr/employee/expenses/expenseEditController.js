define(['lodash'], function(_) {
    'use strict';
    function expenseEditController(userdata, TravelExpenseService, $scope, Restangular, $filter) {
        var controller = this;
        $scope.expense = _.clone(userdata.expense, false);
        $scope.expenseTypes = TravelExpenseService.getTypes();

        controller.onFail = function(response) {
            $scope.errors = response.data.errors;
        };

        controller.saveExpense = function(expense) {
            var expenseEntity = _.pick(expense, ['id', 'version', 'type', 'fromDate', 'toDate', 'vat', 'cost', 'comment', 'paid']);
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
    }
    expenseEditController.$inject = ['createOrUpdateModal.userdata', 'trackr.services.travelExpense', '$scope', 'Restangular', '$filter'];
    return expenseEditController;
});