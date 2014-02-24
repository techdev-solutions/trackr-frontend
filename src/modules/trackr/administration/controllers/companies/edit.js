define([], function() {
    'use strict';
    return ['$stateParams', '$scope', 'Restangular', function($stateParams, $scope, Restangular) {
        /**
         * Show or hide the form for a new contact person for this company
         * @param show true/false = show/hide
         */
        $scope.doShowContactPersonForm = function(show) {
            $scope.showContactPersonForm = show;
        };

        /**
         * POST the entered contact person to the server.
         *
         * This method adds the company relationship to the contact person.
         */
        $scope.saveNewContactPerson = function() {
            //Add the company relationship to the person
            $scope.newContactPerson.company = $scope.company._links.self.href;
            Restangular.all('contactPersons').post($scope.newContactPerson).then(function(result) {
                $scope.newContactPerson = {};
                //TODO: reload from server? Server returns the newly created person!
                $scope.contactPersons.push(result);
                $scope.doShowContactPersonForm(false);
            }, function(response) {
                $scope.contactPersonErrors = response.data;
            });
        };

        $scope.contactPersonErrors = [];
        $scope.newContactPerson = {};
        $scope.doShowContactPersonForm(false);
        Restangular.allUrl('companies', '/api/companies/search/findByCompanyId').getList({companyId: $stateParams.id}).then(function(companies) {
            //todo: why does spring return an array? the method signature is a single entity
            var company = companies[0];

            $scope.company = company;
            company.getList('contactPersons').then(function(contactPersons) {
                $scope.contactPersons = contactPersons;
            });
        });
    }];
});