define([], function () {
    'use strict';
    return {
        init: function (trackr) {
            trackr.config(['$translateProvider', function ($translateProvider) {
                $translateProvider.translations('de', {
                    COMPANY: {
                        CREATE_NEW: 'Neue Firma anlegen',
                        COMPANIES: 'Firmen',
                        COMPANY_ID: 'Eindeutiger Bezeichner',
                        NAME: 'Name'
                    },
                    ADDRESS: {
                        ADDRESS: 'Adresse',
                        STREET: 'Straße',
                        HOUSE_NUMBER: 'Hausnummer',
                        CITY: 'Stadt',
                        ZIPCODE: 'PLZ',
                        COUNTRY: ' Land'
                    },
                    CONTACTPERSON: {
                        CONTACTPERSON: 'Kontaktperson',
                        CONTACTPERSONS: 'Kontaktpersonen',
                        SALUTATION: ' Anrede',
                        FIRST_NAME: 'Vorname',
                        LAST_NAME: 'Nachname',
                        EMAIL: 'Email',
                        PHONE: 'Telefon'
                    },
                    EMPLOYEE: {
                        CREATE_NEW: 'Neuen Angestellten anlegen',
                        EMPLOYEES: 'Angestellte',
                        EMPLOYEE: 'Angestellte/r',
                        FIRST_NAME: 'Vorname',
                        LAST_NAME: 'Nachname',
                        TITLE: 'Titel',
                        SALARY: 'Gehalt',
                        PHONE_NUMBER: 'Telefon',
                        HOURLY_COST_RATE: 'Stundensatz',
                        ADMINISTRATE_ROLES: 'Alle Rollen'
                    },
                    CREDENTIAL: {
                        EMAIL: 'E-Mail',
                        ENABLED: 'Aktiv'
                    },
                    PAGES: {
                        HOME: {
                            WELCOME_TEXT: 'Willkommen bei trackr'
                        },
                        ADMINISTRATION: {
                            TITLE: 'Verwaltung',
                            TEXT_COMPANIES: 'Legen Sie neue Firmen an und editieren Sie bestehende.',
                            TEXT_EMPLOYEES: 'Verwalten Sie Angestellte in trackr.'
                        },
                        EMPLOYEE: {
                            TITLE: 'Self Services',
                            TEXT_EDIT_PROFILE: 'Editieren Sie ihr Profil'
                        }
                    },
                    ACTIONS: {
                        SAVE: 'Speichern',
                        NEW: 'Neu',
                        CANCEL: 'Abbrechen',
                        EDIT: 'Editieren'
                    },
                    LANGUAGE: 'Sprache'
                });

                $translateProvider.translations('en', {
                    COMPANY: {
                        CREATE_NEW: 'Create new company',
                        COMPANIES: 'Companies',
                        COMPANY_ID: 'Unique identifier',
                        NAME: 'Name'
                    },
                    ADDRESS: {
                        ADDRESS: 'Address',
                        STREET: 'Street',
                        HOUSE_NUMBER: 'House number',
                        CITY: 'City',
                        ZIPCODE: 'Zipcode',
                        COUNTRY: ' Country'
                    },
                    CONTACTPERSON: {
                        CONTACTPERSON: 'Contact person',
                        CONTACTPERSONS: 'Contact persons',
                        SALUTATION: ' Salutation',
                        FIRST_NAME: 'First name',
                        LAST_NAME: 'Last name',
                        EMAIL: 'Email',
                        PHONE: 'Phone'
                    },
                    EMPLOYEE: {
                        CREATE_NEW: 'Create new employee',
                        EMPLOYEES: 'Employees',
                        EMPLOYEE: 'Employee',
                        FIRST_NAME: 'First name',
                        LAST_NAME: 'Last name',
                        TITLE: 'Title',
                        SALARY: 'Salary',
                        PHONE_NUMBER: 'Phone number',
                        HOURLY_COST_RATE: 'Hourly cost rate',
                        ADMINISTRATE_ROLES: 'All roles'
                    },
                    CREDENTIAL: {
                        EMAIL: 'E-Mail',
                        ENABLED: 'Enabled'
                    },
                    PAGES: {
                        HOME: {
                            WELCOME_TEXT: 'Welcome to trackr'
                        },
                        ADMINISTRATION: {
                            TITLE: 'Administration',
                            TEXT_COMPANIES: 'Edit and create companies.',
                            TEXT_EMPLOYEES: 'Administrate employees in trackr.'
                        },
                        EMPLOYEE: {
                            TITLE: 'Self Services',
                            TEXT_EDIT_PROFILE: 'Editieren Sie ihr Profil'
                        }
                    },
                    ACTIONS: {
                        SAVE: 'Save',
                        NEW: 'New',
                        CANCEL: 'Cancel',
                        EDIT: 'Edit'
                    },
                    LANGUAGE: 'Language'
                });

                $translateProvider.preferredLanguage('de');
            }]);
        }
    };
});