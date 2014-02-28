define([], function() {
    'use strict';
    /**
     * Directive for a click-to-edit textfield
     *
     * Attributes:
     * * entity: Reference to a restangularified entity
     * * propertyName: the name of the property to display/edit
     * * callback: (optional) A callback that will be called <b>after</b> a successful PATCH call to the API.
     * * role: (optional) If a role is needed to edit the field.
     */
    return ['base.services.user', function(UserService) {
        return {
            restrict: 'E',
            templateUrl: '/src/modules/shared/partials/bsEdit.tpl.html',
            scope: {propertyName: '@', entity: '=', callback: '=', role: '@'},
            link: function(scope, element) {
                if(!scope.role || UserService.userHasAuthority(scope.role)) {
                    var oldValue;

                    //on click show the edit field
                    element.bind('click', function() {
                        //save the old value so we can put it back if the user wants to abort
                        oldValue = scope.entity[scope.propertyName];
                        scope.edit = true;
                        scope.$apply();
                        //focus the cursor on the input element
                        element.find('input')[0].focus();
                    });

                    //on focusout submit
                    element.bind('focusout', function () {
                        //only submit if the value has changed so accidental clicks don't generate requests
                        if(oldValue !== scope.entity[scope.propertyName]) {
                            scope.submit();
                            scope.$apply();
                        } else {
                            scope.edit = false;
                            scope.$apply();
                        }
                    });

                    //on escape cancel
                    element.bind('keydown', function(event) {
                        if(event.which === 27) {
                            scope.entity[scope.propertyName] = oldValue;
                            scope.edit = false;
                            scope.$apply();
                        }
                    });
                }
            },
            controller: ['$scope', 'Restangular', function($scope, Restangular) {
                //Flag if the display form is showed
                $scope.edit = false;
                //Validation errors
                $scope.errors = {};

                $scope.hasError = function (property) {
                    return $scope.errors[property] !== undefined;
                };

                $scope.errorText = function(property) {
                    if($scope.hasError(property)) {
                        return $scope.errors[property].defaultMessage;
                    } else {
                        return '';
                    }
                };

                $scope.submit = function() {
                    //We only want to submit the field we changed
                    var patchObject = {};
                    patchObject[$scope.propertyName] = $scope.entity[$scope.propertyName];
                    //TODO: how to find out the name of the resource? entity.resource is not correct (e.g. credential, not credentials)
                    Restangular.oneUrl('necessary', $scope.entity._links.self.href).patch(patchObject).then(function() {
                        $scope.edit = false;
                        if($scope.callback) {
                            $scope.callback();
                        }
                    }, function(response) {
                        $scope.errors = response.data;
                    });
                };
            }]
        };
    }];
});