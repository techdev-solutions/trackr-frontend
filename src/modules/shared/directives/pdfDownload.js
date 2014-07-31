define(['jQuery'], function($) {
    'use strict';
    /**
     * Download button for pdf files.
     *
     * It first displays "Download". When the user clicks, it downloads the pdf in the background. When the pdf is downloaded
     * it is attached to the href of the link and the "download" HTML5 attribute is set and the text is changed to "Save".
     *
     * The following attributes are required:
     * * {String} url - The url to download the PDF from. The PDF MUST be in Base64 encoding.
     * * {String} filename - The filename to download the file as.
     */
    return ['$filter', function($filter) {
        return {
            restrict: 'E',
            templateUrl: 'src/modules/shared/partials/pdfDownload.tpl.html',
            scope: true,
            link: function(scope, element, attr) {
                var anchor = element.children()[0];

                // When the download starts, disable the link
                scope.$on('download-start', function() {
                    $(anchor).attr('disabled', 'disabled');
                });

                // When the download finishes, attach the data to the link. Enable the link and change its appearance.
                scope.$on('downloaded', function(event, data) {
                    $(anchor).attr({
                        href: 'data:application/pdf;base64,' + data,
                        download: attr.filename
                    })
                        .removeAttr('disabled')
                        .text($filter('translate')('ACTIONS.SAVE'))
                        .removeClass('btn-primary')
                        .addClass('btn-success');

                    // Also overwrite the download pdf function to do nothing.
                    scope.downloadPdf = function() {
                    };
                });
            },
            controller: ['$scope', '$attrs', '$http', function($scope, $attrs, $http) {
                $scope.downloadPdf = function() {
                    $scope.$emit('download-start');
                    $http.get($attrs.url).then(function(response) {
                        $scope.$emit('downloaded', response.data);
                    });
                };
            }]
        };
    }];
});