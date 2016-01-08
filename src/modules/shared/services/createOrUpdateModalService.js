define(['lodash'], function(_) {
    'use strict';
    return ['$uibModal', function($modal) {
        return {
            /**
             * Opens a modal dialog. Uses the 'shared.controllers.create-or-update-modal' that will call '$controller(controllerName)' at its end, thus instantiating
             * the given user controller. The template given will be included in the modal body.
             *
             * The user controller is expected to have a $scope method named "saveEntity()".
             *
             * Additionally userdata can be injected in the user controller (by the key 'createOrUpdateModal.userdata').
             * @param controllerName The user controller to use for the modal.
             * @param templateName The template to load into the modal body.
             * @param titleTranslateCode The code to use for translation in the title of the modal. Can be a function that returns the translate code.
             * @param [userdata] Userdata to inject into the user controller.
             * @return {*} The $modalInstance.
             */
            showModal: function(controllerName, templateName, titleTranslateCode, userdata) {
                return $modal.open({
                    backdrop: 'static',
                    templateUrl: 'src/modules/shared/partials/createOrUpdateModal.tpl.html',
                    controller: 'shared.controllers.create-or-update-modal',
                    resolve: {
                        controllerName: function() { return controllerName; },
                        titleTranslateCode: function() {
                            if(_.isFunction(titleTranslateCode)) {
                                return titleTranslateCode();
                            } else {
                                return titleTranslateCode;
                            }
                        },
                        templateName: function() { return templateName; },
                        'createOrUpdateModal.userdata': function() { return userdata; }
                    }
                });
            }
        };
    }];
});