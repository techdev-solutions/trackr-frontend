define([], function() {
    'use strict';
    /**
     * Basic controller for the modal that is used for editing and creating entities.
     *
     * Expects a "child"-controller name that will be instantiated after the basic setup of the scope. The child controller will get the scope of this
     * controller injected and thus can override any methods. It also gets the userdata injected.
     */
    return ['$scope', '$modalInstance', 'controllerName', '$controller', 'templateName', 'createOrUpdateModal.userdata', 'titleTranslateCode',
        function($scope, $modalInstance, controllerName, $controller, templateName, userdata, titleTranslateCode) {
            $scope.errors = [];

            $scope.titleTranslateCode = titleTranslateCode;
            $scope.templateName = templateName;

            $scope.closeModal = function(resolve) {
                $modalInstance.close(resolve);
            };

            $scope.cancel = function() {
                $modalInstance.dismiss();
            };

            //Instantiate the child controller and inject the current scope and the userdata into it.
            $controller(controllerName, {
                $scope: $scope,
                'createOrUpdateModal.userdata': userdata
            });
        }];
});