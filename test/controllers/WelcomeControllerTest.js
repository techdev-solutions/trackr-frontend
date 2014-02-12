describe('WelcomeController', function () {
    'use strict';
    var UserService, WelcomeController, scope;

    beforeEach(module('trackr'));

    beforeEach(inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        UserService = {
            getUser: function() {
                var deferred = $q.defer();
                deferred.resolve('moritz.schulze@techdev.de');
                return deferred.promise;
            }
        };
        spyOn(UserService, 'getUser').andCallThrough();
        WelcomeController = $controller('WelcomeController', {
            $scope: scope,
            UserService: UserService
        });
    }));

    it('should load the active user', function() {
        expect(UserService.getUser).toHaveBeenCalled();
    });
});