define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.employee.controllers.self-edit', function() {
        var SelfEditController, scope;

        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            scope.closeModal = angular.noop;
            var userdata = {id: 0, firstName: 'firstName', lastName: 'lastName'};
            SelfEditController = $controller('trackr.employee.controllers.self-edit', {
                $scope: scope,
                'createOrUpdateModal.userdata': userdata
            });
        }));

        it('must update the employee via PUT', inject(function($httpBackend) {
            scope.saveEntity();
            $httpBackend.expectPUT('api/employees/0/self');
            $httpBackend.flush();
        }));
    });

});