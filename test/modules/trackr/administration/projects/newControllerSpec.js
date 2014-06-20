define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.administration.controllers.projects.new', function() {
        var NewController, scope;
        baseTestSetup();
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            scope.closeModal = angular.noop;
            NewController = $controller('trackr.administration.controllers.projects.new', {
                $scope: scope
            });
        }));

        it('must have a new company object', function() {
            expect(scope.project).toBeDefined();
        });

        it('Must save the project.', inject(function($httpBackend) {
            scope.saveEntity();
            $httpBackend.expectPOST('api/projects');
            $httpBackend.flush();
        }));

        it('Must search for companies in the backend', inject(function($httpBackend) {
            scope.getCompanies('test');
            $httpBackend.expectGET(/api\/companies\/search\/findByNameLikeIgnoreCaseOrderByNameAsc\?.*/);
            $httpBackend.flush();
        }));
    });
});