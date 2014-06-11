define(['modules/shared/PaginationLoader'], function (PaginationLoader) {
    'use strict';
    return ['$scope', '$modal', 'Restangular', '$http', function($scope, $modal, Restangular, $http) {
        var controller = this;
        $scope.invoices = {};
        $scope.searchQuery = '';
        $scope.states = ['OVERDUE', 'OUTSTANDING', 'PAID'];

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
        var paginationSearchLoader = new PaginationLoader(Restangular.allUrl('invoices', 'api/invoices/search/findByIdentifierLikeAndInvoiceState'),
            'invoices', 'creationDate', $scope, 10);
        paginationSearchLoader.afterObjectsGet = controller.setInvoicesInScope;

        /**
         * Load invoices from the server, either via the searchLoader or the normal loader.
         * @param page The page to load (1-based).
         * @param [state] If provided only this specific invoice state is reloaded (OVERDUE, PAID or OUTSTANDING).
         */
        controller.loadInvoices = function(page, state) {
            var params = {}, loader;

            //Check if we're currently searching or not.
            if($scope.searchQuery !== '') {
                params.identifier = '%' + $scope.searchQuery + '%';
                loader = paginationSearchLoader;
            } else {
                loader = paginationLoader;
            }

            //if the caller provided a state only load that specific state.
            if(state) {
                params.state = state;
                loader.loadPage(page, params, state);
            } else {
                for(var i = 0; i < $scope.states.length; i++) {
                    params.state = $scope.states[i];
                    loader.loadPage(page, params, $scope.states[i]);
                }
            }
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
            controller.loadInvoices($scope.invoices[invoiceState].page.number, invoiceState);
        };

        /**
         * Display the modal for adding a new invoice.
         * @returns {*} The modal instance.
         */
        $scope.addNew = function() {
            var modalInstance = $modal.open({
                backdrop: 'static',
                templateUrl: 'src/modules/invoices/new.tpl.html',
                controller: 'invoices.controllers.new'
            });
            modalInstance.result.then(function(invoice) {
                controller.refreshPage(invoice.invoiceState);
            });
            return modalInstance;
        };

        /**
         * Delete an invoice.
         * @param invoice The invoice to delete.
         */
        $scope.remove = function(invoice) {
            invoice.remove().then(function() {
                controller.refreshPage(invoice.invoiceState);
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