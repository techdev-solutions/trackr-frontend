define(['fixtures'], function(fixtures) {
    'use strict';
    return function($httpBackend) {
        $httpBackend.when('GET', 'api/principal').respond({
            id: 0,
            email: 'admin@techdev.de',
            enabled: true,
            authorities: [
                {authority: 'ROLE_ADMIN', order: 0, id: 0}
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

        mockRoot('api/credentials');
        mockRoot('api/contactPersons');
        mockRoot('api/authorities');
        mockRoot('api/projects');
        mockRoot('api/employees');
        mockRoot('api/companies');
        mockRoot('api/federalStates');

        $httpBackend.when('GET', /^api\/credentials\/[\d]+$/).respond(fixtures['api/credentials']._embedded.credentials[0]);
        $httpBackend.when('GET', /^api\/credentials\/[\d]+\/authorities$/).respond(fixtures['api/authorities']._embedded.authorities);
        $httpBackend.when('GET', /^api\/contactPersons\/[\d]+$/).respond(fixtures['api/contactPersons']._embedded.contactPersons[0]);
        $httpBackend.when('GET', /^api\/authorities\/[\d]+$/).respond(fixtures['api/authorities']._embedded.authorities[0]);
        $httpBackend.when('GET', /^api\/projects\/[\d]+$/).respond(fixtures['api/projects']._embedded.projects[0]);
        $httpBackend.when('GET', /^api\/employees\/[\d]+$/).respond(fixtures['api/employees']._embedded.employees[0]);
        $httpBackend.when('GET', /^api\/employees\/[\d]+\/credential$/).respond(fixtures['api/credentials']._embedded.credentials[0]);
        $httpBackend.when('GET', /^api\/companies\/[\d]+$/).respond(fixtures['api/companies']._embedded.companies[0]);
        $httpBackend.when('GET', /^api\/companies\/[\d]+\/address$/).respond(fixtures['api/addresses']._embedded.addresses[0]);
        $httpBackend.when('GET', /^api\/companies\/[\d]+\/contactPersons/).respond(fixtures['api/contactPersons']);
        $httpBackend.when('GET', /^api\/companies\/[\d]+\/projects/).respond(fixtures['api/projects']);
        $httpBackend.whenGET(/^api\/vacationRequests\/\d+\/employee/).respond(fixtures['api/employees']._embedded.employees[0]);
        $httpBackend.whenGET(/^api\/vacationRequests\/\d+\/approver/).respond(fixtures['api/employees']._embedded.employees[1]);

        $httpBackend.whenGET(/api\/workTimes\/findEmployeeMappingByProjectAndDateBetween\?.*/)
            .respond(fixtures['api/workTimes/findEmployeeMappingByProjectAndDateBetween']);
        $httpBackend.whenGET(/api\/workTimes\/search\/findByEmployeeAndDateBetweenOrderByDateAscStartTimeAsc\?.*/)
            .respond(fixtures['api/workTimes']);
        $httpBackend.whenGET(/api\/workTimes\/\d+\/project/).respond(fixtures['api/projects']._embedded.projects[0]);

        $httpBackend.whenGET(/^api\/billableTimes\/findEmployeeMappingByProjectAndDateBetween\?.*/)
            .respond(fixtures['api/billableTimes']);

        $httpBackend.whenGET(/api\/projects\/search\/findByNameLikeOrIdentifierLikeOrderByNameAsc\?.*/)
            .respond(fixtures['api/projects']);

        $httpBackend.whenGET(/api\/projects\/search\/findByIdentifier\?.*/).respond(fixtures['api/projects']);

        $httpBackend.whenGET(/^api\/vacationRequests\/search\/findByEmployeeOrderByStartDateAsc\?.*/).respond(fixtures['api/vacationRequests']);
        $httpBackend.whenGET(/^api\/vacationRequests\/search\/findByStatusOrderBySubmissionTimeAsc\?.*/).respond(fixtures['api/vacationRequests']);

        $httpBackend.whenDELETE(/^api\/vacationRequests\/\d+/).respond([204]);

        $httpBackend.whenDELETE(/^api\/contactPersons\/\d+/).respond([204]);

        mockPost('api/contactPersons');
        mockPost('api/billableTimes');
        mockPost('api/workTimes');
        mockPost('api/companies/createWithAddress');
        mockPost('api/employees/createWithCredential');
        mockPost('api/projects');
        mockPost('api/vacationRequests');

        $httpBackend.whenPATCH(/^api\/credentials\/\d+$/).respond(function(method, url, data) {
            return [200, data];
        });

        $httpBackend.whenPATCH(/^api\/employees\/\d+$/).respond(function(method, url, data) {
            return [200, data];
        });
        $httpBackend.whenPATCH(/^api\/employees\/\d+\/self$/).respond(function(method, url, data) {
            return [200, data];
        });

        $httpBackend.whenPUT(/^api\/translations\?.*/).respond({});

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

        $httpBackend.whenGET(/^api\/companies\/search\/findByCompanyId\?.*/).respond(fixtures['api/companies']);
        $httpBackend.whenGET(/^api\/companies\/search\/findByNameLikeOrderByNameAsc\?.*/).respond(fixtures['api/companies']);

        $httpBackend.whenDELETE(/^api\/credentials\/\d+\/authorities\/\d+/).respond([204]);
        $httpBackend.whenPATCH(/^api\/credentials\/\d+\/authorities/).respond([204]);

        /* ############################ TEMPLATES ########################### */
        /*
         Just return an empty template.
         */
        $httpBackend.whenGET(/^.*\.tpl\.html$/).respond(
            [200, '<div></div>']
        );
    };
});