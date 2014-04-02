define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.administration.controllers.employees.roles-base', function () {
        var RolesBaseController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            RolesBaseController = $controller('trackr.administration.controllers.employees.roles-base', {
                $scope: scope
            });
        }));

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('must have authorities in the scope', function() {
            expect(scope.authorities).toBeDefined();
            expect(scope.authorities.length).toBeGreaterThan(0);
        });

        it('The hasAuthority function must evaluate if a credential object has an authority', function() {
            var credential = {
                authorities: [
                    {
                        id: 2
                    }
                ]
            };
            var hasAuthority = scope.hasAuthority(credential, { id: 2 });
            expect(hasAuthority).toBe(true);
            hasAuthority = scope.hasAuthority(credential, { id: 0 });
            expect(hasAuthority).toBe(false);
        });

        it('The updateCredentialAuthorities function must delete an authority and remove it from the object', inject(function($httpBackend) {
            var credential = {
                _links: {
                    self: {
                        href: 'api/credentials/0'
                    }
                },
                authorities: [
                    {
                        id: 2
                    }
                ]
            };
            scope.updateCredentialAuthorities(credential, { id: 2 });
            $httpBackend.expectDELETE('api/credentials/0/authorities/2');
            $httpBackend.flush();
            expect(credential.authorities.length).toBe(0);
        }));

        it('The updateCredentialAuthorities function must add an authority and push it to the object', inject(function($httpBackend) {
            var credential = {
                _links: {
                    self: {
                        href: 'api/credentials/0'
                    }
                },
                authorities: [
                    {
                        id: 2
                    }
                ]
            };
            scope.updateCredentialAuthorities(credential, { id: 1, _links: { self: { href: 'api/authorities/1' } } });
            $httpBackend.expectPATCH('api/credentials/0/authorities');
            $httpBackend.flush();
            expect(credential.authorities.length).toBe(2);
        }));
    });
});
