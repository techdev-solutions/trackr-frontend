define(['lodash', 'moment'], function(_, moment) {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.employee', 'shared.services.create-or-update-modal',
        function($scope, Restangular, EmployeeService, createOrUpdateModalService) {
            var controller = this;

            Restangular.allUrl('sickDays', 'api/sickDays/search/findByEmployee')
                .getList({
                    employee: EmployeeService.getEmployee().id
                })
                .then(function(sickDays) {
                    $scope.sickDays = sickDays;
                });

            // End date is open as a default.
            $scope.endDate = -1;
            $scope.startDate = new Date();

            $scope.showEditForm = function(sickDay) {
                var $modalInstance = createOrUpdateModalService
                    .showModal('trackr.employee.controllers.sick-days-edit',
                    'src/modules/trackr/employee/sick_days/sick-days-edit.tpl.html',
                    'ACTIONS.EDIT', sickDay);

                $modalInstance.result.then(function(editedSickDay) {
                    var index = _.findIndex($scope.sickDays, function(ex) {
                        return ex.id === editedSickDay.id;
                    });
                    $scope.sickDays[index] = editedSickDay;
                });
            };

            $scope.totalDays = function(sickDay) {
                if(sickDay.endDate) {
                    var end = moment(sickDay.endDate).startOf('day');
                    var start = moment(sickDay.startDate).startOf('day');
                    return end.diff(start, 'days', false) + 1;
                } else {
                    return '';
                }
            };

            controller.addSickDays = function(start, end) {
                var sickDays = {
                    employee: EmployeeService.getEmployeeHref()
                };
                //We format the values because otherwise Spring will return the dates including hours (even though the
                //TemporalType is DATE for both). This will mess with the display of the total days.
                if (start) {
                    sickDays.startDate = moment(start).format('YYYY-MM-DD');
                }
                if (end) {
                    sickDays.endDate = moment(end).format('YYYY-MM-DD');
                }
                Restangular.all('sickDays').post(sickDays).then(function(postedSickDays) {
                    $scope.sickDays.push(postedSickDays);
                });
            };

            $scope.addSickDays = function() {
                controller.addSickDays($scope.startDate, $scope.endDate);
            };
        }];
});