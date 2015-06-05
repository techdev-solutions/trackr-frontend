define([], function () {
    'use strict';

    var expenseNewController = function($scope, Restangular, $filter, TravelExpenseService) {
        var controller = this;

        $scope.ctrl = this; // todo legacy because the included modal references it this way..
        $scope.expense = {};
        $scope.expenseTypes = TravelExpenseService.getTypes();

        $scope.addNewExpense = function(report) {
            $scope.expense.report = report._links.self.href;
            $scope.expense.submissionDate = new Date();
            Restangular.all('travelExpenses').post($scope.expense).then(function(expense) {
                $scope.errors = [];
                $scope.expense = {
                    toDate: expense.toDate,
                    fromDate: expense.fromDate
                };
                $scope.$emit('newExpense', expense);
            }, function(response) {
                $scope.errors = response.data.errors;
            });
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

    };
    expenseNewController.$inject = ['$scope', 'Restangular', '$filter', 'trackr.services.travelExpense'];
    return expenseNewController;
});