describe('WelcomeController', function () {
    'use strict';
    var UserRestService, WelcomeController, scope;

    beforeEach(module('trackr'));

    beforeEach(inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        UserRestService = {
            getActiveUser: function() {
                var deferred = $q.defer();
                deferred.resolve('moritz.schulze@techdev.de');
                return deferred.promise;
            }
        };
        spyOn(UserRestService, 'getActiveUser').andCallThrough();
        WelcomeController = $controller('WelcomeController', {
            $scope: scope,
            UserRestService: UserRestService
        });
    }));

    it('should load the active user', function() {
        expect(UserRestService.getActiveUser).toHaveBeenCalled();
    });
});