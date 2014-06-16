define([], function() {
    'use strict';
    return ['$modal', function($modal) {
        return {
            /**
             * Opens a confirmation dialog with the buttons ok/cancel and the text translated by the translate code.
             * @param translateCode The text to insert into the modal, given by a translation code.
             * @returns {*} The $modalInstance
             */
            openConfirmationDialog: function(translateCode) {
                return $modal.open({
                    backdrop: 'static',
                    templateUrl: 'src/modules/base/partials/confirmationDialog.tpl.html',
                    controller: 'base.controllers.confirmation-dialog',
                    resolve: {
                        translationCode: function() {
                            return translateCode;
                        }
                    }
                });
            }
        };
    }];
});