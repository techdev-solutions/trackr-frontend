define(['jQuery'], function($) {
    'use strict';
    return [function() {
        return {
            restrict: 'A',
            compile: function(element) {

                /**
                 * Create a mirror element to let the width be calculated by the browser
                 * @type {*|jQuery|HTMLElement}
                 */
                var mirror = $('<span style="position:absolute; top:-999px; left:0; white-space:pre;"/>');

                /**
                 * Apply all relevant CSS styles
                 */
                ['fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'letterSpacing', 'textIndent', 'textTransform', 'wordSpacing'].forEach(function(style) {
                    mirror[0].style[style] = element.css(style);
                });
                $('body').append(mirror);

                return function(scope, element, attributes) {
                    function updateWidth() {
                        var value = element.val();
                        if(!value) {
                            value = element.attr('placeholder') || '';
                        }
                        if(value === mirror.text()) {
                            return;
                        }

                        mirror.text(value);
                        element.width(mirror.width() + 5);
                    }

                    scope.$watch(attributes.ngModel, function() {
                        updateWidth();
                    });

                    element.bind('keydown keypress', function() {
                        updateWidth();
                    });
                };
            }
        };
    }];
});