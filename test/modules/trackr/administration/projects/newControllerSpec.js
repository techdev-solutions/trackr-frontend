define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.administration.controllers.projects.new', function() {
        var NewController, scope;
        baseTestSetup();
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            NewController = $controller('trackr.administration.controllers.projects.new', {
                $scope: scope,
                //for now mocked here
                //TODO: find out why the provider is not available
                $modalInstance: {
                    dismiss: angular.noop,
                    close: angular.noop
                }
            });
        }));

        it('must have an errors object', function() {
            expect(scope.errors).toBeDefined();
        });

        it('must have a new company object', function() {
            expect(scope.project).toBeDefined();
        });

        it('Must save the project.', inject(function($httpBackend) {
            var company = {_links: {self: {href: 'api/companies/0'}}};
            scope.saveProject(company, company);
            $httpBackend.expectPOST('api/projects');
            $httpBackend.flush();
        }));

        it('Must search for companies in the backend', inject(function($httpBackend) {
            scope.getCompanies('test');
            $httpBackend.expectGET(/api\/companies\/search\/findByNameLikeOrderByNameAsc\?.*/);
            $httpBackend.flush();
        }));
    });
});