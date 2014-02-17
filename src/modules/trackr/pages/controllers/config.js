define(['lodash'], function (_) {
    'use strict';
    return ['Restangular', '$scope', function (Restangular, $scope) {
        $scope.authorities = Restangular.all('authorities').getList().$object;

        //Load all credentials and subsequently all authorities for each credential.
        Restangular.all('credentials').getList().then(function(credentials) {
            credentials.forEach(function(credential) {
                credential.all('authorities').getList().then(function(authorities) {
                    credential.authorities = authorities;
                });
            });
            $scope.credentials = credentials;
        });

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
            if($scope.hasAuthority(credential, authority)) {
                credential.customDELETE('authorities/' + authority.id).then(function() {
                    _.remove(credential.authorities, function (a) {
                        return a.id === authority.id;
                    });
                });
            } else {
                credential.customOperation('patch', 'authorities', {}, {'Content-type': 'text/uri-list'}, authority._links.self.href).then(function() {
                        credential.authorities.push(authority);
                    }
                );
            }
        };
    }];
});