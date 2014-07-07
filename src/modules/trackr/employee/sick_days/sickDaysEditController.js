define(['lodash'], function(_) {
    'use strict';
    return ['$scope', 'createOrUpdateModal.userdata', 'Restangular', function($scope, sickDays, Restangular) {
        var controller = this;
        $scope.sickDays = _.pick(sickDays, 'id', 'version', 'startDate', 'endDate');

        $scope.saveEntity = function() {
            controller.saveSickDays($scope.sickDays);
        };

        $scope.openDate = function(event, name) {
            event.stopPropagation();
            event.preventDefault();
            $scope[name] = true;
        };

        controller.onError = function(response) {
            $scope.errors = response.data.errors;
        };

        controller.saveSickDays = function(sickDays) {
            Restangular.one('sickDays', sickDays.id)
                .patch(sickDays)
                .then(function(savedSickDays) {
                    $scope.closeModal(savedSickDays);
                }, controller.onError);
        };

        $scope.dateOptions = {
            'year-format': '\'yyyy\'',
            'starting-day': 1
        };
    }];
});