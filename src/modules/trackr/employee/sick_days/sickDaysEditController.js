define(['lodash', 'moment'], function(_, moment) {
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
            $scope[name] = !$scope[name];
        };

        controller.onError = function(response) {
            $scope.errors = response.data.errors;
        };

        controller.saveSickDays = function(sickDays) {
            if(sickDays.startDate) {
                sickDays.startDate = moment(sickDays.startDate).format('YYYY-MM-DD');
            }
            if(sickDays.endDate) {
                sickDays.endDate = moment(sickDays.endDate).format('YYYY-MM-DD');
            }
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