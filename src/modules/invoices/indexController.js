define(['modules/shared/PaginationLoader'], function(PaginationLoader) {
    'use strict';
    return ['$scope', 'Restangular', '$http', 'base.services.confirmation-dialog', 'shared.services.create-or-update-modal',
        function($scope, Restangular, $http, ConfirmationDialogService, createOrUpdateModalService) {
            var controller = this;
            $scope.invoices = {};
            $scope.searchQuery = '';
            $scope.states = ['OVERDUE', 'OUTSTANDING', 'PAID'];

            var orderBy = null;
            var isAscendingOrder = true;

            /**
             * This will override paginationLoader.afterObjectsGet because we need to set the result from
             * the query more sophisticated.
             * @param invoices The returned invoices from the query
             * @param invoicesState The invoice state those invoices belong to.
             */
            controller.setInvoicesInScope = function(invoices, invoicesState) {
                $scope.invoices[invoicesState] = invoices;
            };

            /**
             * The pagination loader to use when no search is defined
             * @type {PaginationLoader}
             */
            var paginationLoader = new PaginationLoader(Restangular.allUrl('invoices', 'api/invoices/search/findByInvoiceState'),
                'invoices', 'creationDate', $scope, 10);
            paginationLoader.afterObjectsGet = controller.setInvoicesInScope;

            /**
             * The pagination loader to use when the user is searching
             * @type {PaginationLoader}
             */
            var paginationSearchLoader = new PaginationLoader(Restangular.allUrl('invoices', 'api/invoices/search/findByIdentifierLikeIgnoreCaseAndInvoiceState'),
                'invoices', 'creationDate', $scope, 10);
            paginationSearchLoader.afterObjectsGet = controller.setInvoicesInScope;

            /**
             * Load invoices from the server, either via the searchLoader or the normal loader.
             * @param page The page to load (1-based).
             * @param [state] If provided only this specific invoice state is reloaded (OVERDUE, PAID or OUTSTANDING).
             * @param [sort] If provided the returned invoices are sorted by the specified column with specified sorting direction
             */
            controller.loadInvoices = function(page, state, sort) {
                var params = { projection: 'withDebitor' }, loader;

                if (sort) {
                    params.sort = sort;
                }

                //Check if we're currently searching or not.
                if ($scope.searchQuery !== '') {
                    params.identifier = '%' + $scope.searchQuery + '%';
                    loader = paginationSearchLoader;
                } else {
                    loader = paginationLoader;
                }

                //if the caller provided a state only load that specific state.
                if (state) {
                    params.state = state;
                    loader.loadPage(page, params, state);
                } else {
                    for (var i = 0; i < $scope.states.length; i++) {
                        params.state = $scope.states[i];
                        loader.loadPage(page, params, $scope.states[i]);
                    }
                }
            };

            /**
             * Load invoices in the correct sort order, ordered by the chosen property
             * @param state The state the tab belongs to.
             * @param sort Property name to sort the invoices.
             * @param [ignoreSameOrderProperty] 'true', if the sorting order has to be ignored (used for pagination calls).
             */
            $scope.loadSortedInvoices = function(state, sort, ignoreSameOrderProperty) {
                if (!ignoreSameOrderProperty) {
                    if (orderBy == sort) {
                        isAscendingOrder = !isAscendingOrder;
                    } else {
                        isAscendingOrder = true;
                    }
                }
                orderBy = sort;
                var sortingStr = orderBy === null ? null : orderBy + ',' + (isAscendingOrder ? 'asc' : 'desc');
                controller.loadInvoices($scope.invoices[state].page.number, state, sortingStr);
            };

            /**
             * Returns whether the invoices are sorted by the given property in ascending order.
             * @param property Property name to check.
             * @returns 'true', if invoices are sorted by the property above, otherwise 'false'.
             */
            $scope.isSortedAsc = function(property) {
                return orderBy == property && isAscendingOrder;
            };

            /**
             * Returns whether the invoices are sorted by the given property in ascending order.
             * @param property Property name to check.
             * @returns 'true', if invoices are sorted by the property above, otherwise 'false'.
             */
            $scope.isSortedDesc = function(property) {
                return orderBy == property && !isAscendingOrder;
            };

            /**
             * Will be called when the user changes the search field input, no need to check for anything here.
             */
            $scope.executeSearch = function() {
                controller.loadInvoices(1);
            };

            /**
             * Will be called when the user changes the page of one invoices tab
             * @param state The state the tab belongs to.
             */
            $scope.setPage = function(state) {
                controller.refreshPage(state);
            };

            /**
             * Refresh a single state of invoices (i.e. the current loaded page).
             * @param invoiceState The state to refresh.
             */
            controller.refreshPage = function(invoiceState) {
                $scope.loadSortedInvoices(invoiceState, orderBy, true);
            };

            /**
             * Display the modal for adding a new invoice.
             * @returns {*} The modal instance.
             */
            $scope.addNew = function() {
                var $modalInstance = createOrUpdateModalService
                    .showModal('invoices.controllers.new as ctrl',
                    'src/modules/invoices/newOrEdit.tpl.html',
                    'INVOICE.CREATE_NEW'
                );
                $modalInstance.result.then(function(invoice) {
                    controller.refreshPage(invoice.invoiceState);
                });
            };

            /**
             * Delete an invoice.
             * @param invoice The invoice to delete.
             */
            $scope.remove = function(invoice) {
                function deleteInvoice() {
                    invoice.remove().then(function() {
                        controller.refreshPage(invoice.invoiceState);
                    });
                }

                ConfirmationDialogService.openConfirmationDialog('ACTIONS.REALLY_DELETE').result.then(deleteInvoice);
            };

            $scope.showEditForm = function(invoice) {
                var $modalInstance = createOrUpdateModalService
                    .showModal('invoices.controllers.edit as ctrl',
                    'src/modules/invoices/newOrEdit.tpl.html',
                    'ACTIONS.EDIT', invoice);
                $modalInstance.result.then(function(editedInvoice) {
                    //If the invoice dueDate gets set to a date in the past it will be marked as
                    //overdue, so we have to refresh the page with the old state and the one with the new state.
                    controller.refreshPage(invoice.invoiceState);
                    controller.refreshPage(editedInvoice.invoiceState);
                });
            };

            /**
             * Mark the invoice as paid.
             * @param invoice Invoice to mark.
             */
            $scope.markPaid = function(invoice) {
                $http.post('api/invoices/' + invoice.id + '/markPaid').then(function() {
                    controller.refreshPage(invoice.invoiceState);
                    controller.refreshPage('PAID');
                });
            };

            controller.loadInvoices(1);
        }];
});