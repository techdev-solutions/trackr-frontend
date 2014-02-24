define(['lodash'], function (_) {
    'use strict';
    /**
     * This is a base controller for other controller that wish to perform update operations on authorities.
     */
    return ['Restangular', '$scope', function (Restangular, $scope) {
        /*
         * Load all all available authorities into the scope.
         */
        $scope.authorities = Restangular.all('authorities').getList().$object;

        /**
         * Test if a credential.authoritie array contains the given authority.
         * @param credential The credentials to check for the authority
         * @param authority The authority to be checked
         * @returns {Boolean|boolean} true if the credential.authorities contains authority (by id)
         */
        $scope.hasAuthority = function(credential, authority) {
            return _.contains(_.map(credential.authorities, function (a) {
                return a.id;
            }), authority.id);
        };

        /**
         * Adds or removes the authority form credential.authorities, also sends the corresponding request to the backend.
         * @param credential The credential object to update (restangularified)
         * @param authority The authority object to insert/delete from credential.authorities.
         */
        $scope.updateCredentialAuthorities = function(credential, authority) {
            /*
                The credential object could come from anywhere and have its base url messed up (e.g. /api/employees/1/credentialBase).
                To update the object we need its self url which is saved in the _links.self object.
             */
            var credentialBase = Restangular.oneUrl('credentials', credential._links.self.href);
            if($scope.hasAuthority(credential, authority)) {
                credentialBase.customDELETE('authorities/' + authority.id).then(function() {
                    _.remove(credentialBase.authorities, function (a) {
                        return a.id === authority.id;
                    });
                });
            } else {
                credentialBase.customOperation('patch', 'authorities', {}, {'Content-type': 'text/uri-list'}, authority._links.self.href).then(function() {
                        credential.authorities.push(authority);
                    }
                );
            }
        };
    }];
});