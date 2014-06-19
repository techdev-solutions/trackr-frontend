define(['lodash'], function(_) {
    'use strict';
    return ['$stateParams', '$scope', 'Restangular', '$state', 'base.services.confirmation-dialog', 'shared.services.create-or-update-modal',
        function($stateParams, $scope, Restangular, $state, confirmationDialogService, createOrUpdateModalService) {
            var controller = this;
            /**
             * Show or hide the form for a new contact person for this company
             * @param show true/false = show/hide
             */
            $scope.doShowContactPersonForm = function(show) {
                $scope.showContactPersonForm = show;
            };

            /**
             * POST the entered contact person to the server.
             * This method adds the company relationship to the contact person.
             */
            $scope.saveNewContactPerson = function() {
                //Add the company relationship to the person
                var companyLink = $scope.company._links.self.href;
                if(companyLink) {
                    companyLink = companyLink.substr(0, companyLink.indexOf('{'));
                }
                $scope.newContactPerson.company = companyLink;
                Restangular.all('contactPersons').post($scope.newContactPerson).then(function(result) {
                    $scope.newContactPerson = {};
                    $scope.company.contactPersons.push(result);
                    $scope.doShowContactPersonForm(false);
                    $scope.errors = [];
                }, function(response) {
                    $scope.errors = response.data.errors;
                });
            };

            /**
             * Delete a contact person from this company by issuing a DELETE to the API
             * @param contactPerson The contact person to delete
             */
            $scope.removeContactPerson = function(contactPerson) {
                function deleteContactPerson() {
                    /*
                     We cant use the contactPerson object directly because it is tied to the company.
                     Restangular would execute DELETE '/api/companies/0/contactPersons/0' which is not what we want
                     */
                    Restangular.one('contactPersons', contactPerson.id).remove().then(function() {
                        _.remove($scope.company.contactPersons, function(cP) {
                            return cP.id === contactPerson.id;
                        });
                    });
                }
                confirmationDialogService.openConfirmationDialog('ACTIONS.REALLY_DELETE').result.then(deleteContactPerson);
            };

            $scope.showEditForm = function() {
                var modalInstance = createOrUpdateModalService
                    .showModal('trackr.administration.controllers.companies.edit', 'src/modules/trackr/administration/companies/newOrEdit.tpl.html', 'ACTIONS.EDIT', $scope.company);
                modalInstance.result.then(function(company) {
                    var oldCompanyId = $scope.company.companyId;
                    $scope.company = company;
                    if(oldCompanyId !== company.companyId) {
                        controller.companyIdChanged();
                    }
                });
            };

            controller.companyIdChanged = function() {
                //Change the company id in the list in the parent controller
                var companyInList = _.find($scope.$parent.companies, {id: $scope.company.id});
                companyInList.companyId = $scope.company.companyId;
                //reload so the url is correct
                $state.go('trackr.administration.companies.edit', {id: $scope.company.companyId});
            };

            /*
             Initialization of $scope objects
             */
            $scope.errors = [];
            $scope.newContactPerson = {};
            $scope.doShowContactPersonForm(false);
            Restangular.allUrl('companies', 'api/companies/search/findByCompanyId').getList({
                companyId: $stateParams.id,
                projection: 'withAddressAndContactPersons'
            }).then(function(companies) {
                //TODO: why does spring return an array? The method signature is a single entity.
                $scope.company = companies[0];
            });
        }];
});