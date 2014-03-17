define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.administration.controllers.projects.list', function () {
        var ListController, scope, state;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            state = {
                go: angular.noop
            };
            spyOn(state, 'go');
            ListController = $controller('trackr.administration.controllers.projects.list', {
                $scope: scope,
                $state: state
            });
        }));

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('must have projects in the scope', function() {
            expect(scope.projects).toBeDefined();
            expect(scope.projects.length).toBeGreaterThan(0);
        });

        it('must open the modal dialog on addNew and reload the projects if the modal is closed and go to the new project', inject(function($httpBackend) {
            var modalInstance = scope.addNew();
            expect(modalInstance).toBeDefined();
            $httpBackend.flush();
            modalInstance.close({id: 0});
            $httpBackend.expectGET(/^\/api\/projects\?.*$/);
            $httpBackend.flush();
            expect(state.go).toHaveBeenCalled();
        }));
    });
});