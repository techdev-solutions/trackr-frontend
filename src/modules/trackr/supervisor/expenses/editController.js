define(['modules/trackr/employee/expenses/expensesDecorator'], function(expensesDecorator) {
        'use strict';
        return ['$scope', 'Restangular', 'trackr.services.travelExpenseReport', '$state', 'base.services.user', '$stateParams', 'base.services.notification',
            function($scope, Restangular, TravelExpenseReportService, $state, UserService, $stateParams, NotificationService) {
                var controller = this;
                var travelExpenseReportBase = Restangular.one('travelExpenseReports', $stateParams.id);

                travelExpenseReportBase
                    .get({
                        projection: 'overview'
                    })
                    .then(function(report) {
                        if(report.debitor) {
                            controller.loadProjects(report.debitor);
                        }
                        return report.all('comments').getList({
                            projection: 'withEmployee'
                        }).then(function(comments) {
                            report.comments = comments;
                            return report;
                        });
                    })
                    .then(function(report) {
                        $scope.report = report;
                        $scope.report.statusTranslateCode = 'TRAVEL_EXPENSE_REPORT.' + report.status;
                        expensesDecorator($scope.report.expenses);
                    })
                    .catch(function(response) {
                        if(response && response.status === 404) {
                            $scope.reportId = $stateParams.id;
                            $scope.report = undefined;
                        }
                    });

                $scope.report = {};
                $scope.principal = UserService.getUser();

                $scope.accept = function(report) {
                    TravelExpenseReportService.approve(report).then(function() {
                        $state.go('app.trackr.supervisor.expenses', null, { reload: true });
                    });
                };

                $scope.reject = function(report) {
                    TravelExpenseReportService.reject(report).then(function() {
                        $state.go('app.trackr.supervisor.expenses', null, { reload: true });
                    });
                };

                /**
                 * Preprocessor for comment-section that adds the report to a comment.
                 * @param {Object} comment The comment to edit
                 * @return {Object} The comment with the report
                 */
                $scope.addReport = function(comment) {
                    comment.travelExpenseReport = $scope.report._links.self.href;
                    return comment;
                };

                $scope.getCompanies = function(searchString) {
                    return Restangular.allUrl('companies', 'api/companies/search/findByNameLikeIgnoreCaseOrderByNameAsc')
                        .getList({name: '%' + searchString + '%'});
                };

                controller.updateLink = function(name, href) {
                    return travelExpenseReportBase.customOperation('put', name, {}, {'Content-Type': 'text/uri-list'}, href)
                        .then(function() {
                            NotificationService.info(name + ' changed.');
                        }, function() {
                            NotificationService.error('Error changing ' + name);
                        });
                };

                $scope.selectCompany = function(company) {
                    controller.deleteProject().then(function() {
                        $scope.report.project = undefined;
                        controller.updateLink('debitor', company._links.self.href);
                    });
                    controller.loadProjects(company);
                };

                controller.deleteProject = function() {
                    return travelExpenseReportBase.one('project').remove();
                };

                controller.loadProjects = function(company) {
                    Restangular.one('companies', company.id).all('projects').getList().then(function(projects) {
                        $scope.projects = projects;
                    });
                };

                $scope.selectProject = function(project) {
                    controller.updateLink('project', project._links.self.href);
                };
            }
        ];
    }
);