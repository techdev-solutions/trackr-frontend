/* jshint quotmark: double */
define([], function() {
    "use strict";
    return {
        "api": {
            "_links": {
                "credentials": {
                    "href": "http://localhost:8080/api/credentials{?page,size,sort}",
                    "templated": true
                },
                "contactPersons": {
                    "href": "http://localhost:8080/api/contactPersons{?page,size,sort}",
                    "templated": true
                },
                "authorities": {
                    "href": "http://localhost:8080/api/authorities{?page,size,sort}",
                    "templated": true
                },
                "projects": {
                    "href": "http://localhost:8080/api/projects{?page,size,sort}",
                    "templated": true
                },
                "addresses": {
                    "href": "http://localhost:8080/api/addresses{?page,size,sort}",
                    "templated": true
                },
                "employees": {
                    "href": "http://localhost:8080/api/employees{?page,size,sort}",
                    "templated": true
                },
                "companies": {
                    "href": "http://localhost:8080/api/companies{?page,size,sort}",
                    "templated": true
                }
            }
        },

        "api/credentials": {
            "_links": {
                "self": {
                    "href": "http://localhost:8080/api/credentials{?page,size,sort}",
                    "templated": true
                },
                "search": {
                    "href": "http://localhost:8080/api/credentials/search"
                }
            },
            "_embedded": {
                "credentials": [
                    {
                        "id": 0,
                        "email": "admin@techdev.de",
                        "enabled": true,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/credentials/0"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/credentials/0/employee"
                            },
                            "authorities": {
                                "href": "http://localhost:8080/api/credentials/0/authorities"
                            }
                        }
                    },
                    {
                        "id": 1,
                        "email": "moritz.schulze@techdev.de",
                        "enabled": true,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/credentials/1"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/credentials/1/employee"
                            },
                            "authorities": {
                                "href": "http://localhost:8080/api/credentials/1/authorities"
                            }
                        }
                    },
                    {
                        "id": 2,
                        "email": "viktor.widiker@techdev.de",
                        "enabled": true,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/credentials/2"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/credentials/2/employee"
                            },
                            "authorities": {
                                "href": "http://localhost:8080/api/credentials/2/authorities"
                            }
                        }
                    },
                    {
                        "id": 3,
                        "email": "alexander.hanschke@techdev.de",
                        "enabled": true,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/credentials/3"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/credentials/3/employee"
                            },
                            "authorities": {
                                "href": "http://localhost:8080/api/credentials/3/authorities"
                            }
                        }
                    },
                    {
                        "id": 4,
                        "email": "adrian.krion@techdev.de",
                        "enabled": true,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/credentials/4"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/credentials/4/employee"
                            },
                            "authorities": {
                                "href": "http://localhost:8080/api/credentials/4/authorities"
                            }
                        }
                    },
                    {
                        "id": 5,
                        "email": "angelika.gutjahr@techdev.de",
                        "enabled": true,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/credentials/5"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/credentials/5/employee"
                            },
                            "authorities": {
                                "href": "http://localhost:8080/api/credentials/5/authorities"
                            }
                        }
                    },
                    {
                        "id": 6,
                        "email": "nikolaj.weise@techdev.de",
                        "enabled": true,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/credentials/6"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/credentials/6/employee"
                            },
                            "authorities": {
                                "href": "http://localhost:8080/api/credentials/6/authorities"
                            }
                        }
                    }
                ]
            },
            "page": {
                "size": 20,
                "totalElements": 7,
                "totalPages": 1,
                "number": 0
            }
        },

        "api/contactPersons": {
            "_links": {
                "self": {
                    "href": "http://localhost:8080/api/contactPersons{?page,size,sort}",
                    "templated": true
                }
            },
            "_embedded": {
                "contactPersons": [
                    {
                        "id": 0,
                        "version": 0,
                        "email": "alexander.hanschke@techdev.de",
                        "firstName": "Alexander",
                        "lastName": "Hanschke",
                        "phone": "0178/11234566",
                        "salutation": "Herr",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/contactPersons/0"
                            },
                            "company": {
                                "href": "http://localhost:8080/api/contactPersons/0/company"
                            }
                        }
                    },
                    {
                        "id": 1,
                        "version": 0,
                        "email": "adrian.krion@techdev.de",
                        "firstName": "Adrian",
                        "lastName": "Krion",
                        "phone": "0178/234586923",
                        "salutation": "Herr",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/contactPersons/1"
                            },
                            "company": {
                                "href": "http://localhost:8080/api/contactPersons/1/company"
                            }
                        }
                    }
                ]
            },
            "page": {
                "size": 20,
                "totalElements": 2,
                "totalPages": 1,
                "number": 0
            }
        },

        "api/authorities": {
            "_links": {
                "self": {
                    "href": "http://localhost:8080/api/authorities{?page,size,sort}",
                    "templated": true
                }
            },
            "_embedded": {
                "authorities": [
                    {
                        "id": 0,
                        "authority": "ROLE_ADMIN",
                        "order": 0,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/authorities/0"
                            }
                        }
                    },
                    {
                        "id": 1,
                        "authority": "ROLE_SUPERVISOR",
                        "order": 1,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/authorities/1"
                            }
                        }
                    },
                    {
                        "id": 2,
                        "authority": "ROLE_EMPLOYEE",
                        "order": 2,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/authorities/2"
                            }
                        }
                    }
                ]
            },
            "page": {
                "size": 20,
                "totalElements": 3,
                "totalPages": 1,
                "number": 0
            }
        },

        "api/projects": {
            "_links": {
                "self": {
                    "href": "http://localhost:8080/api/projects{?page,size,sort}",
                    "templated": true
                }
            },
            "_embedded": {
                "projects": [
                    {
                        "id": 0,
                        "version": 0,
                        "identifier": "1001.1",
                        "name": "Freiberuflerverwaltung",
                        "volume": 142,
                        "hourlyRate": null,
                        "dailyRate": null,
                        "fixedPrice": 500000.01,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/projects/0"
                            },
                            "debitor": {
                                "href": "http://localhost:8080/api/projects/0/debitor"
                            },
                            "company": {
                                "href": "http://localhost:8080/api/projects/0/company"
                            }
                        }
                    },
                    {
                        "id": 1,
                        "version": 0,
                        "identifier": "5000.1",
                        "name": "Zaun streichen",
                        "volume": 1,
                        "hourlyRate": null,
                        "dailyRate": null,
                        "fixedPrice": 3.14,
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/projects/1"
                            },
                            "debitor": {
                                "href": "http://localhost:8080/api/projects/1/debitor"
                            },
                            "company": {
                                "href": "http://localhost:8080/api/projects/1/company"
                            }
                        }
                    }
                ]
            },
            "page": {
                "size": 20,
                "totalElements": 2,
                "totalPages": 1,
                "number": 0
            }
        },

        "api/employees": {
            "_links": {
                "self": {
                    "href": "http://localhost:8080/api/employees{?page,size,sort}",
                    "templated": true
                }
            },
            "_embedded": {
                "employees": [
                    {
                        "id": 0,
                        "version": 0,
                        "firstName": "admin",
                        "lastName": "admin",
                        "phoneNumber": null,
                        "title": "",
                        "salary": 0.00,
                        "hourlyCostRate": 0.00,
                        "joinDate": null,
                        "leaveDate": null,
                        "federalState": { name: null },
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/employees/0"
                            },
                            "credential": {
                                "href": "http://localhost:8080/api/employees/0/credential"
                            }
                        }
                    },
                    {
                        "id": 1,
                        "version": 0,
                        "firstName": "Moritz",
                        "lastName": "Schulze",
                        "phoneNumber": null,
                        "title": "Hausmeister",
                        "salary": 40.00,
                        "hourlyCostRate": 0.25,
                        "joinDate": null,
                        "leaveDate": null,
                        "federalState": { name: null },
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/employees/1"
                            },
                            "credential": {
                                "href": "http://localhost:8080/api/employees/1/credential"
                            }
                        }
                    },
                    {
                        "id": 2,
                        "version": 0,
                        "firstName": "Viktor",
                        "lastName": "Widiker",
                        "phoneNumber": null,
                        "title": "Software Consultant",
                        "salary": 456.00,
                        "hourlyCostRate": 123.00,
                        "joinDate": null,
                        "leaveDate": null,
                        "federalState": { name: null },
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/employees/2"
                            },
                            "credential": {
                                "href": "http://localhost:8080/api/employees/2/credential"
                            }
                        }
                    },
                    {
                        "id": 3,
                        "version": 0,
                        "firstName": "Alexander",
                        "lastName": "Hanschke",
                        "phoneNumber": null,
                        "title": "Praktikant",
                        "salary": 654.32,
                        "hourlyCostRate": 321.00,
                        "joinDate": null,
                        "leaveDate": null,
                        "federalState": { name: null },
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/employees/3"
                            },
                            "credential": {
                                "href": "http://localhost:8080/api/employees/3/credential"
                            }
                        }
                    },
                    {
                        "id": 4,
                        "version": 0,
                        "firstName": "Adrian",
                        "lastName": "Krion",
                        "phoneNumber": null,
                        "title": "Sekretär",
                        "salary": 123455.00,
                        "hourlyCostRate": 6854.00,
                        "joinDate": null,
                        "leaveDate": null,
                        "federalState": { name: null },
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/employees/4"
                            },
                            "credential": {
                                "href": "http://localhost:8080/api/employees/4/credential"
                            }
                        }
                    },
                    {
                        "id": 5,
                        "version": 0,
                        "firstName": "Angelika",
                        "lastName": "Gutjahr",
                        "phoneNumber": null,
                        "title": "Entertainerin",
                        "salary": 500000.00,
                        "hourlyCostRate": 900.10,
                        "joinDate": null,
                        "leaveDate": null,
                        "federalState": { name: null },
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/employees/5"
                            },
                            "credential": {
                                "href": "http://localhost:8080/api/employees/5/credential"
                            }
                        }
                    },
                    {
                        "id": 6,
                        "version": 0,
                        "firstName": "Nikolaj",
                        "lastName": "Weise",
                        "phoneNumber": null,
                        "title": "Empfang",
                        "salary": 123.40,
                        "hourlyCostRate": 100.50,
                        "joinDate": null,
                        "leaveDate": null,
                        "federalState": { name: null },
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/employees/6"
                            },
                            "credential": {
                                "href": "http://localhost:8080/api/employees/6/credential"
                            }
                        }
                    }
                ]
            },
            "page": {
                "size": 20,
                "totalElements": 7,
                "totalPages": 1,
                "number": 0
            }
        },

        "api/companies": {
            "_links": {
                "self": {
                    "href": "http://localhost:8080/api/companies{?page,size,sort}",
                    "templated": true
                },
                "search": {
                    "href": "http://localhost:8080/api/companies/search"
                }
            },
            "_embedded": {
                "companies": [
                    {
                        "id": 0,
                        "version": 0,
                        "companyId": 1000,
                        "name": "techdev Solutions UG",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/companies/0"
                            },
                            "address": {
                                "href": "http://localhost:8080/api/companies/0/address"
                            },
                            "projects": {
                                "href": "http://localhost:8080/api/companies/0/projects"
                            },
                            "contactPersons": {
                                "href": "http://localhost:8080/api/companies/0/contactPersons"
                            },
                            "debitorProjects": {
                                "href": "http://localhost:8080/api/companies/0/debitorProjects"
                            }
                        }
                    },
                    {
                        "id": 1,
                        "version": 0,
                        "companyId": 1001,
                        "name": "cofinpro AG",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/companies/1"
                            },
                            "address": {
                                "href": "http://localhost:8080/api/companies/1/address"
                            },
                            "projects": {
                                "href": "http://localhost:8080/api/companies/1/projects"
                            },
                            "contactPersons": {
                                "href": "http://localhost:8080/api/companies/1/contactPersons"
                            },
                            "debitorProjects": {
                                "href": "http://localhost:8080/api/companies/1/debitorProjects"
                            }
                        }
                    },
                    {
                        "id": 2,
                        "version": 0,
                        "companyId": 5000,
                        "name": "Hays",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/companies/2"
                            },
                            "address": {
                                "href": "http://localhost:8080/api/companies/2/address"
                            },
                            "projects": {
                                "href": "http://localhost:8080/api/companies/2/projects"
                            },
                            "contactPersons": {
                                "href": "http://localhost:8080/api/companies/2/contactPersons"
                            },
                            "debitorProjects": {
                                "href": "http://localhost:8080/api/companies/2/debitorProjects"
                            }
                        }
                    }
                ]
            },
            "page": {
                "size": 20,
                "totalElements": 3,
                "totalPages": 1,
                "number": 0
            }
        },

        "api/addresses": {
            "_links": {
                "self": {
                    "href": "http://localhost:8080/api/addresses{?page,size,sort}",
                    "templated": true
                }
            },
            "_embedded": {
                "addresses": [
                    {
                        "id": 0,
                        "version": 0,
                        "street": "Bismarckstraße",
                        "houseNumber": "47",
                        "zipCode": "76133",
                        "city": "Karlsruhe",
                        "country": "Deutschland",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/addresses/0"
                            }
                        }
                    },
                    {
                        "id": 1,
                        "version": 0,
                        "street": "Zur Gießerei",
                        "houseNumber": "19a",
                        "zipCode": "76123",
                        "city": "Karlsruhe",
                        "country": "Deutschland",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/addresses/1"
                            }
                        }
                    },
                    {
                        "id": 2,
                        "version": 0,
                        "street": "Friedrichstraße",
                        "houseNumber": "123",
                        "zipCode": "10521",
                        "city": "Berlin",
                        "country": "Deutschland",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/addresses/2"
                            }
                        }
                    }
                ]
            },
            "page": {
                "size": 20,
                "totalElements": 3,
                "totalPages": 1,
                "number": 0
            }
        },

        "api/workTimes": {
            "_links": {
                "search": {
                    "href": "http://localhost:8080/api/workTimes/search"
                }
            },
            "_embedded": {
                "workTimes": [
                    {
                        "id": 0,
                        "version": 0,
                        "date": "2014-03-03",
                        "startTime": "09:00:00",
                        "endTime": "17:15:00",
                        "comment": "Kommentar 1",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/workTimes/0"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/workTimes/0/employee"
                            },
                            "project": {
                                "href": "http://localhost:8080/api/workTimes/0/project"
                            }
                        }
                    },
                    {
                        "id": 6,
                        "version": 0,
                        "date": "2014-03-03",
                        "startTime": "09:00:00",
                        "endTime": "17:00:00",
                        "comment": "Kommentar 123",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/workTimes/6"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/workTimes/6/employee"
                            },
                            "project": {
                                "href": "http://localhost:8080/api/workTimes/6/project"
                            }
                        }
                    },
                    {
                        "id": 7,
                        "version": 0,
                        "date": "2014-03-03",
                        "startTime": "09:00:00",
                        "endTime": "12:00:00",
                        "comment": "Kommentar 46",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/workTimes/7"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/workTimes/7/employee"
                            },
                            "project": {
                                "href": "http://localhost:8080/api/workTimes/7/project"
                            }
                        }
                    },
                    {
                        "id": 8,
                        "version": 0,
                        "date": "2014-03-04",
                        "startTime": "12:00:00",
                        "endTime": "15:00:00",
                        "comment": "Kommentar 789",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/workTimes/8"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/workTimes/8/employee"
                            },
                            "project": {
                                "href": "http://localhost:8080/api/workTimes/8/project"
                            }
                        }
                    },
                    {
                        "id": 1,
                        "version": 0,
                        "date": "2014-03-04",
                        "startTime": "09:00:00",
                        "endTime": "17:00:00",
                        "comment": "Kommentar 2",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/workTimes/1"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/workTimes/1/employee"
                            },
                            "project": {
                                "href": "http://localhost:8080/api/workTimes/1/project"
                            }
                        }
                    },
                    {
                        "id": 2,
                        "version": 0,
                        "date": "2014-03-05",
                        "startTime": "09:00:00",
                        "endTime": "12:00:00",
                        "comment": "Kommentar 3",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/workTimes/2"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/workTimes/2/employee"
                            },
                            "project": {
                                "href": "http://localhost:8080/api/workTimes/2/project"
                            }
                        }
                    },
                    {
                        "id": 3,
                        "version": 0,
                        "date": "2014-03-05",
                        "startTime": "13:00:00",
                        "endTime": "17:00:00",
                        "comment": "Kommentar 4",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/workTimes/3"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/workTimes/3/employee"
                            },
                            "project": {
                                "href": "http://localhost:8080/api/workTimes/3/project"
                            }
                        }
                    },
                    {
                        "id": 4,
                        "version": 0,
                        "date": "2014-03-06",
                        "startTime": "09:00:00",
                        "endTime": "17:00:00",
                        "comment": "Kommentar 5",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/workTimes/4"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/workTimes/4/employee"
                            },
                            "project": {
                                "href": "http://localhost:8080/api/workTimes/4/project"
                            }
                        }
                    },
                    {
                        "id": 5,
                        "version": 0,
                        "date": "2014-03-07",
                        "startTime": "09:00:00",
                        "endTime": "17:00:00",
                        "comment": "Kommentar 6",
                        "_links": {
                            "self": {
                                "href": "http://localhost:8080/api/workTimes/5"
                            },
                            "employee": {
                                "href": "http://localhost:8080/api/workTimes/5/employee"
                            },
                            "project": {
                                "href": "http://localhost:8080/api/workTimes/5/project"
                            }
                        }
                    }
                ]
            }
        },

        "api/workTimes/findEmployeeMappingByProjectAndDateBetween": {
            "1": {"name": "Moritz Schulze", "workTimes": [
                {"date": "2014-03-03", "minutes": 495},
                {"date": "2014-03-04", "minutes": 480},
                {"date": "2014-03-05", "minutes": 240},
                {"date": "2014-03-06", "minutes": 480},
                {"date": "2014-03-07", "minutes": 480}
            ], "links": [
                {"rel": "self", "href": "http://localhost:8080/api/employees/1"}
            ]},
            "2": {"name": "Viktor Widiker", "workTimes": [
                {"date": "2014-03-03", "minutes": 480}
            ], "links": [
                {"rel": "self", "href": "http://localhost:8080/api/employees/2"}
            ]},
            "4": {"name": "Adrian Krion", "workTimes": [
                {"date": "2014-03-03", "minutes": 180},
                {"date": "2014-03-04", "minutes": 180}
            ], "links": [
                {"rel": "self", "href": "http://localhost:8080/api/employees/4"}
            ]}
        },

        "api/federalStates": [
            {"name": "BADEN_WUERTTEMBERG", "state": "Baden-Württemberg"},
            {"name": "BAYERN", "state": "Bayern"},
            {"name": "BERLIN", "state": "Berlin"},
            {"name": "BRANDENBURG", "state": "Brandenburg"},
            {"name": "BREMEN", "state": "Bremen"},
            {"name": "HAMBURG", "state": "Hamburg"},
            {"name": "HESSEN", "state": "Hessen"},
            {"name": "MECKLENBURG_VORPOMMERN", "state": "Mecklenburg-Vorpommern"},
            {"name": "NIEDERSACHSEN", "state": "Niedersachsen"},
            {"name": "NORDRHEIN_WESTFALEN", "state": "Nordrhein-Westfalen"},
            {"name": "RHEINLAND_PFALZ", "state": "Rheinland-Pfalz"},
            {"name": "SAARLAND", "state": "Saarland"},
            {"name": "SACHSEN", "state": "Sachsen"},
            {"name": "SACHSEN_ANHALT", "state": "Sachsen-Anhalt"},
            {"name": "SCHLESWIG_HOLSTEINT", "state": "Schleswig-Holstein"},
            {"name": "THUERINGEN", "state": "Thüringen"}
        ]
    };
});