define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.administration.controllers.employees.edit', function () {
        var EditController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            EditController = $controller('trackr.administration.controllers.employees.edit', {
                $scope: scope,
                $stateParams: {
                    id: 0
                }
            });
        }));

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('must have an employee in scope', function() {
            expect(scope.employee).toBeDefined();
        });

        it('must have a credential in scope', function() {
            expect(scope.credential).toBeDefined();
        });

        it('The credentials must have authorities', function() {
            expect(scope.credential.authorities).toBeDefined();
        });

        it('changeEnabled must sent a patch', inject(function($httpBackend) {
            scope.changeEnabled();
            $httpBackend.expectPATCH(/^\/api\/credentials\/\d+$/);
            $httpBackend.flush();
        }));

        it('if the joinDate is changed a patch must be sent', inject(function($httpBackend) {
            scope.employee.joinDate = '2013-01-01';
            $httpBackend.expectPATCH(/^\/api\/employees\/\d+$/);
            $httpBackend.flush();
        }));

        it('if the leaveDate is changed a patch must be sent and credentials must be reloaded', inject(function($httpBackend) {
            scope.employee.leaveDate = '2013-01-01';
            $httpBackend.expectPATCH(/^\/api\/employees\/\d+$/);
            $httpBackend.expectGET(/^\/api\/credentials\/\d+$/);
            $httpBackend.flush();
        }));
    });
});