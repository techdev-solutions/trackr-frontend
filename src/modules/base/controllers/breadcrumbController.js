define([], function() {
    'use strict';
    return ['$scope', '$state', '$log', function($scope, $state, $log) {
        function getBreadcrumbChain(state) {
            if(state.self.url === '^') {
                //This is the root state of the state provider.
                return [];
            }

            var breadcrumb = {
                translateCode: state.self.breadcrumbTranslateCode,
                //Every module has a abstract parent state and a home state. Since we can't ui-sref to the abstract
                //state we use the home state. Of course this only works under the given assumptions.
                stateName: state.self.abstract ? state.self.name + '.home' : state.self.name
            };

            if(breadcrumb.translateCode === undefined) {
                $log.debug('State without breadcrumb translate code', breadcrumb.stateName);
            }

            return [breadcrumb].concat(getBreadcrumbChain(state.parent));
        }

        function putBreadcrumbsInScope(state) {
            var breadcrumbs = getBreadcrumbChain(state);
            $scope.breadcrumbs = breadcrumbs.reverse();
        }

        $scope.$on('$stateChangeSuccess', function() {
            putBreadcrumbsInScope($state.$current);
        });
    }];
});