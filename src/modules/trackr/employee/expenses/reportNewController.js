define([], function() {
    'use strict';
    return ['$scope', 'Restangular', 'trackr.services.employee', function($scope, Restangular, EmployeeService) {
        var controller = this;
        $scope.report = {
            employee: EmployeeService.getEmployeeHref(),
            status: 'PENDING'
        };
        $scope.errors = {};

        $scope.getCompanies = function(searchString) {
            return Restangular.allUrl('companies', 'api/companies/search/findByNameLikeIgnoreCaseOrderByNameAsc')
                .getList({name: '%' + searchString + '%'});
        };

        $scope.loadProjects = function(company) {
            controller.project = undefined;
            company.all('projects').getList().then(function(projects) {
                $scope.projects = projects;
            });
        };

        $scope.saveEntity = function() {
            if(controller.company) {
                $scope.report.debitor = controller.company._links.self.href;
            }
            if(controller.project) {
                $scope.report.project = controller.project._links.self.href;
            }
            Restangular.all('travelExpenseReports').post($scope.report).then(function(report) {
                $scope.closeModal(report);
            }, function(response) {
                $scope.errors = response.data.errors;
            });
        };
    }];
});