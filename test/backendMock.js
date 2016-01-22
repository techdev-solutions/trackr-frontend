define(['fixtures'], function(fixtures) {
    'use strict';
    return function($httpBackend) {
        $httpBackend.when('GET', 'api/principal').respond({
            id: 0,
            email: 'admin@techdev.de',
            enabled: true,
            authorities: [
                {authority: 'ROLE_ADMIN'}
            ]
        });

        /**
         * Mocks a request to an entity root that can contain parameters like page, sort, size (they will be ignored though).
         * Responds with data from the fixtures.
         * @param url The URL to mock, like '/api/companies'.
         */
        function mockRoot(url) {
            //base
            $httpBackend.whenGET(url).respond(fixtures[url]);
            //with query parameters
            var pattern = new RegExp('^' + url + '\\?.*$');
            $httpBackend.whenGET(pattern).respond(fixtures[url]);
        }

        /**
         * Mocks a POST to an entity root, just answers with 201 and the data inserted.
         * @param url The url on which to mock POST.
         */
        function mockPost(url) {
            $httpBackend.whenPOST(url).respond(function(method, url, data) {
                return [201, data];
            });
        }

        /**
         * Mock patching a single entitiy
         * @param url The url to mock (e.g. 'api/employees'
         */
        function mockPatch(url) {
            var pattern = new RegExp('^' + url + '/\\d+$');
            $httpBackend.whenPATCH(pattern).respond(function(method, url, data) {
                return [200, data];
            });
        }

        //##### -- ADDRESSES
        mockPatch('api/addresses');
        $httpBackend.whenPOST('api/addresses')
            .respond(function() {
                var address = { _links: { self: { href: '' } } };
                return [200, address];
            });
        $httpBackend.whenPUT(/^api\/addresses\/\d+$/).respond(function(method, url, data) {
            return [201, data];
        });

        //#### -- BILLABLE TIMES
        mockPost('api/billableTimes');
        $httpBackend.whenGET(/^api\/billableTimes\/findEmployeeMappingByProjectAndDateBetween\?.*/)
            .respond(fixtures['api/billableTimes']);
        $httpBackend.whenGET(/^api\/billableTimes\/search\/findByDateBetween\?end=\d+&projection=withProject&start=\d+/)
            .respond(function() {
                var data = fixtures['api/billableTimes'];
                data._embedded.billableTimes.forEach(function(billableTime) {
                    billableTime.project = fixtures['api/projects']._embedded.projects[0];
                });
                return [200, data];
            });

        //#### -- COMPANIES
        mockRoot('api/companies');
        mockPost('api/companies');
        mockPatch('api/companies');
        $httpBackend.when('GET', /^api\/companies\/[\d]+$/)
            .respond(fixtures['api/companies']._embedded.companies[0]);
        $httpBackend.when('GET', /^api\/companies\/[\d]+\/projects/)
            .respond(fixtures['api/projects']);
        $httpBackend.whenGET(/^api\/companies\/search\/findByCompanyId\?companyId=\w+$/)
            .respond(fixtures['api/companies']);
        $httpBackend.whenGET(/^api\/companies\/search\/findByCompanyId\?companyId=\w+&projection=\w+$/)
            .respond(function() {
                var response = fixtures['api/companies'];
                response._embedded.companies[0].address = fixtures['api/addresses']._embedded.addresses[0];
                response._embedded.companies[0].contactPersons = fixtures['api/contactPersons']._embedded.contactPersons;
                return [200, response];
            });
        $httpBackend.whenGET(/^api\/companies\/search\/findByNameLikeIgnoreCaseOrderByNameAsc\?.*/)
            .respond(fixtures['api/companies']);

        //#### -- CONTACT PERSONS
        mockRoot('api/contactPersons');
        mockPost('api/contactPersons');
        $httpBackend.whenGET(/^api\/contactPersons\/[\d]+$/).respond(fixtures['api/contactPersons']._embedded.contactPersons[0]);
        $httpBackend.whenDELETE(/^api\/contactPersons\/\d+/).respond([204]);

        //#### -- EMPLOYEES
        mockRoot('api/employees');
        mockPatch('api/employees');
        mockPost('api/employees');
        $httpBackend.whenGET(/^api\/employees\/\d+$/).respond(fixtures['api/employees']._embedded.employees[0]);
        $httpBackend.whenGET(/^api\/employees\/\d+\?projection=withAddress$/).respond(function() {
            var employee = fixtures['api/employees']._embedded.employees[0];
            employee.address = fixtures['api/addresses']._embedded.addresses[0];
            return [200, employee];
        });
        $httpBackend.whenGET(/^api\/employees\/\d+\/self$/).respond(fixtures['api/employees']._embedded.employees[0]);
        $httpBackend.whenPUT(/^api\/employees\/\d+\/self$/).respond(function(method, url, data) {
            return [200, data];
        });
        $httpBackend.whenPUT(/^api\/employees\/\d+\/address$/).respond([204]);

        //#### -- FEDERAL STATES
        mockRoot('api/federalStates');

        //#### -- INVOICES
        mockRoot('api/invoices');
        mockPost('api/invoices');
        $httpBackend.whenGET(/^api\/invoices\/search\/findByInvoiceState\?page=\d+&projection=\w+&size=\d+&sort=creationDate&state=\w+/)
            .respond(fixtures['api/invoices']);
        $httpBackend.whenGET(/^api\/invoices\/search\/findByIdentifierLikeIgnoreCaseAndInvoiceState\?identifier=%25\w+%25&page=\d+&projection=\w+&size=\d+&sort=creationDate&state=\w+/)
            .respond(fixtures['api/invoices']);
        $httpBackend.whenGET(/^api\/invoices\/search\/findByCreationDateBetween\?end=\d+&projection=withDebitor&start=\d+/)
            .respond(function() {
                //add a debitor
                var invoices = fixtures['api/invoices'];
                invoices._embedded.invoices.forEach(function(invoice) {
                    invoice.debitor = fixtures['api/companies']._embedded.companies[0];
                });
                return [200, invoices];
            });
        $httpBackend.whenPOST(/^api\/invoices\/\d+\/markPaid$/)
            .respond([204, 'Ok.']);

        //#### -- PROJECTS
        mockRoot('api/projects');
        mockPost('api/projects');
        $httpBackend.whenGET(/^api\/projects\/\d+$/)
            .respond(fixtures['api/projects']._embedded.projects[0]);
        $httpBackend.whenGET(/api\/projects\/search\/findByNameLikeIgnoreCaseOrIdentifierLikeIgnoreCaseOrderByNameAsc\?.*/)
            .respond(fixtures['api/projects']);
        $httpBackend.whenGET(/api\/projects\/search\/findByIdentifier\?.*/)
            .respond(fixtures['api/projects']);

        //#### -- REDUCED EMPLOYEES / ADDRESSBOOK
        $httpBackend.whenGET(/^api\/address_book\?page=\d+&size=\d+/)
            .respond(fixtures['api/address_book']._embedded.reducedEmployees);

        //#### -- TRAVEL EXPENSES
        mockPost('api/travelExpenses');
        mockPatch('api/travelExpenses');
        $httpBackend.whenDELETE(/^api\/travelExpenses\/\d+/).respond([204]);

        //#### -- TRAVEL EXPENSE REPORTS
        mockPost('api/travelExpenseReports');
        $httpBackend.whenGET(/^api\/travelExpenseReports\/\d+\?projection=\w+/)
            .respond(function() {
                var fixture = fixtures['api/travelExpenseReports']._embedded.travelExpenseReports[0];
                fixture.expenses = fixtures['api/travelExpenses']._embedded.travelExpenses;
                return [200, fixture];
            });
        $httpBackend.whenGET(/^api\/travelExpenseReports\/\d+\/comments\?projection=\w+/)
            .respond(function() {
                var fixture = fixtures['api/travelExpenseReportComments']._embedded.travelExpenseReportComments;
                fixture.forEach(function(comment) {
                    comment.employee = fixtures['api/employees']._embedded.employees[0];
                });
                return [200, fixture];
            });
        $httpBackend.whenGET(/^api\/travelExpenseReports\/search\/findByEmployeeAndStatusOrderByStatusAsc\?page=\d+&projection=\w+&size=\d+&sort=\w*&status=\w+$/)
            .respond(fixtures['api/travelExpenseReports']);
        $httpBackend.whenGET(/^api\/travelExpenseReports\/search\/findByStatus\?page=\d+&projection=\w+&size=\d+&sort=[\w,\.]*&status=\w+$/)
            .respond(fixtures['api/travelExpenseReports']);
        $httpBackend.whenGET(/^api\/travelExpenseReports\/search\/findBySubmissionDateBetween\?end=\d+&projection=withEmployeeAndExpenses&start=\d+$/)
            .respond(function() {
                var data = fixtures['api/travelExpenseReports'];
                data._embedded.travelExpenseReports.forEach(function(report) {
                    report.employee = fixtures['api/employees']._embedded.employees[0];
                    report.expenses = fixtures['api/travelExpenses']._embedded.expenses;
                });
                return [200, data];
            });
        $httpBackend.whenPUT(/^api\/travelExpenseReports\/\d+\/submit/)
            .respond([204]);
        $httpBackend.whenPUT(/^api\/travelExpenseReports\/\d+\/approve/)
            .respond([204]);
        $httpBackend.whenPUT(/^api\/travelExpenseReports\/\d+\/reject/)
            .respond([204]);

        //#### -- TRANSLATIONS
        $httpBackend.whenPUT(/^api\/translations\?.*/).respond({});
        $httpBackend.whenGET(/^api\/translations\?.*/).respond({});

        //#### -- VACATION REQUESTS
        mockPost('api/vacationRequests');
        $httpBackend.whenGET(/^api\/vacationRequests\/search\/findByEmployeeOrderByStartDateAsc\?.*/)
            .respond(fixtures['api/vacationRequests']);
        $httpBackend.whenGET(/^api\/vacationRequests\/search\/findByStatusOrderBySubmissionTimeAsc\?.*/)
            .respond(fixtures['api/vacationRequests']);
        $httpBackend.whenGET(/^api\/vacationRequests\/daysPerEmployeeBetween\?end=\d+&projection=withEmployeeAndApprover&start=\d+$/)
            .respond(function() {
                var data = fixtures['api/vacationRequests'];
                data._embedded.vacationRequests.forEach(function(vacationRequest) {
                    var employee = fixtures['api/employees']._embedded.employees[0];
                    vacationRequest.employee = employee;
                    vacationRequest.approver = employee;
                });
                return [200, data];
            });
        $httpBackend.whenDELETE(/^api\/vacationRequests\/\d+/).respond([204]);
        $httpBackend.whenPUT(/^api\/vacationRequests\/\d+\/approve/).respond(function() {
            return [200, {
                approver: 'api/employees/0',
                status: 'APPROVED',
                approvalDate: new Date()
            }];
        });
        $httpBackend.whenPUT(/^api\/vacationRequests\/\d+\/reject/).respond(function() {
            return [200, {
                approver: 'api/employees/0',
                status: 'REJECTED',
                approvalDate: new Date()
            }];
        });

        //#### -- WORK TIMES
        mockPost('api/workTimes');
        $httpBackend.whenGET(/api\/workTimes\/findEmployeeMappingByProjectAndDateBetween\?.*/)
            .respond(fixtures['api/workTimes/findEmployeeMappingByProjectAndDateBetween']);
        $httpBackend.whenGET(/api\/workTimes\/search\/findByEmployeeAndDateBetweenOrderByDateAscStartTimeAsc\?.*/)
            .respond(fixtures['api/workTimes']);
        $httpBackend.whenGET(/api\/workTimes\/\d+\/project/).respond(fixtures['api/projects']._embedded.projects[0]);
        $httpBackend.whenGET(/^api\/workTimes\/search\/findByDateBetween\?end=\d+&projection=withProject&start=\d+/)
            .respond(function() {
                var data = fixtures['api/workTimes'];
                data._embedded.workTimes.forEach(function(workTime) {
                    workTime.project = fixtures['api/projects']._embedded.projects[0];
                });
                return [200, data];
            });
        $httpBackend.whenGET(/^api\/workTimes\/search\/findByDateBetween\?end=\d+&projection=withEmployee&start=\d+$/)
            .respond(function() {
                var data = fixtures['api/workTimes'];
                data._embedded.workTimes.forEach(function(workTime) {
                    workTime.employee = fixtures['api/employees']._embedded.employees[0];
                });
                return [200, data];
            });

        /* ############################ TEMPLATES ########################### */
        /*
         Just return an empty template.
         */
        $httpBackend.whenGET(/^.*\.tpl\.html$/).respond(
            [200, '<div></div>']
        );
    };
});